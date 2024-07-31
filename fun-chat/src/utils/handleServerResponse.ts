import { IError } from '../interface/interface.error';
import { IUser, IUserListUnreadMessage } from '../interface/interface.client';
import {
    IResponseAuthorization,
    IResponseDeleteMessage,
    IResponseDelivered,
    IResponseEditMessage,
    IResponseHistoryMessage,
    IResponseMessage,
    IResponseUsers,
} from '../interface/interface.response';
import handleAuthorizationUpdateUserList from './handleUpdateUserList';
import { NavigateFunction } from 'react-router-dom';
import { IMessage } from '../interface/interface.server';
import handleSessionStorage from './handleSessionStorage';
import handleCountUnreadMessage from './handleCountUnreadMessage';
import getCompanionName from './getCompanionName';

interface UseServerResponse {
    responseAuthorization: (event: MessageEvent) => void;
    responseLogout: (event: MessageEvent) => void;
    responseActiveUsers: (event: MessageEvent) => void;
    responseInactiveUsers: (event: MessageEvent) => void;
    responseSendMessage: (event: MessageEvent) => void;
    responseHistoryMessage: (event: MessageEvent) => void;
    responseDeleteMessage: (event: MessageEvent) => void;
    responseReadMessage: (event: MessageEvent) => void;
    responseEditMessage: (event: MessageEvent) => void;
    responseDeliver: (event: MessageEvent) => void;
}

const handleServerResponse = (
    navigate: NavigateFunction,
    setErrorLogin: React.Dispatch<React.SetStateAction<string | null>>,
    setUserList: React.Dispatch<React.SetStateAction<IUser[]>>,
    setUserListUnreadMessage: React.Dispatch<React.SetStateAction<IUserListUnreadMessage>>,
    setHistoryMessage: React.Dispatch<React.SetStateAction<IMessage[] | null>>,
    setTargetUser: React.Dispatch<React.SetStateAction<IUser | null>>,
    requestHistoryMessage: (username: string) => void,
    historyMessage: IMessage[] | null,
    targetUser: IUser | null,
): UseServerResponse => {
    const responseAuthorization = (event: MessageEvent): void => {
        const data: IResponseAuthorization | IError = JSON.parse(event.data);

        if (data.type === 'USER_LOGIN') {
            handleAuthorizationUpdateUserList(setUserList, data);
            navigate('/chat');
            setErrorLogin(null);
        } else if (data.type === 'ERROR') {
            setErrorLogin(data.payload.error);
        }
    };

    const responseLogout = (event: MessageEvent): void => {
        const data: IResponseAuthorization = JSON.parse(event.data);

        if (data.type === 'USER_LOGOUT') {
            navigate('/');
        } else if (data.type === 'USER_EXTERNAL_LOGIN') {
            setUserList((prevList) => {
                const updateUserList: IUser[] = [
                    ...prevList.filter((user) => user.login !== data.payload.user.login),
                    data.payload.user,
                ];

                return updateUserList;
            });

            if (data.payload.user.login === targetUser?.login) {
                setTargetUser({ login: targetUser.login, isLogined: !targetUser.isLogined });
            }
        } else if (data.type === 'USER_EXTERNAL_LOGOUT') {
            setUserList((prevList) => {
                const updateUserList: IUser[] = [
                    ...prevList.filter((user) => user.login !== data.payload.user.login),
                    data.payload.user,
                ];

                return updateUserList;
            });

            if (data.payload.user.login === targetUser?.login) {
                setTargetUser({ login: targetUser.login, isLogined: !targetUser.isLogined });
            }
        }
    };

    const responseActiveUsers = (event: MessageEvent): void => {
        const data: IResponseUsers = JSON.parse(event.data);

        if (data.type === 'USER_ACTIVE') {
            setUserList((prev) => {
                const username: string = handleSessionStorage().getDataUserAccount().username;
                const filterActiveUsers: IUser[] = prev.filter((user) => !user.isLogined);

                data.payload.users.forEach((user) => {
                    if (username !== user.login) requestHistoryMessage(user.login);

                    setUserListUnreadMessage((prevList) => {
                        return { ...prevList, [user.login]: 0 };
                    });
                });

                return [...filterActiveUsers, ...data.payload.users];
            });
        }
    };

    const responseInactiveUsers = (event: MessageEvent): void => {
        const data: IResponseUsers = JSON.parse(event.data);

        if (data.type === 'USER_INACTIVE') {
            setUserList((prev) => {
                const username: string = handleSessionStorage().getDataUserAccount().username;
                const filterInactiveUsers: IUser[] = prev.filter((user) => user.isLogined);

                data.payload.users.forEach((user) => {
                    if (username !== user.login) requestHistoryMessage(user.login);

                    setUserListUnreadMessage((prevList) => {
                        return { ...prevList, [user.login]: 0 };
                    });
                });

                return [...filterInactiveUsers, ...data.payload.users];
            });
        }
    };

    const responseSendMessage = (event: MessageEvent): void => {
        const data: IResponseMessage = JSON.parse(event.data);

        if (data.type === 'MSG_SEND') {
            if (targetUser?.login === data.payload.message.to || targetUser?.login === data.payload.message.from) {
                setHistoryMessage((prevHistoryMessage) => {
                    const updatedHistory: IMessage[] = [...(prevHistoryMessage || []), data.payload.message];
                    return updatedHistory;
                });
            }

            const companionName: string = getCompanionName(data.payload.message.to, data.payload.message.from);
            requestHistoryMessage(companionName);
        }
    };

    const responseHistoryMessage = (event: MessageEvent): void => {
        const data: IResponseHistoryMessage = JSON.parse(event.data);

        if (data.type === 'MSG_FROM_USER') {
            const companionName: string = getCompanionName(
                data.payload.messages[0]?.to,
                data.payload.messages[0]?.from,
            );

            if (targetUser?.login || companionName === targetUser?.login) {
                setHistoryMessage(data.payload.messages);
            }

            handleCountUnreadMessage(data.payload.messages, companionName, setUserListUnreadMessage);
        }
    };

    const responseDeleteMessage = (event: MessageEvent): void => {
        const data: IResponseDeleteMessage = JSON.parse(event.data);

        if (data.type === 'MSG_DELETE') {
            if (data.payload.message.status.isDeleted) {
                setHistoryMessage((prevHistoryMessage) => {
                    const updateHistoryMessage: IMessage[] =
                        prevHistoryMessage?.filter((message) => message.id !== data.payload.message.id) || [];

                    return updateHistoryMessage;
                });
            }
        }
    };

    const responseReadMessage = (event: MessageEvent): void => {
        const data: IResponseEditMessage = JSON.parse(event.data);

        if (data.type === 'MSG_READ') {
            setHistoryMessage(() => {
                const updateHistoryMessage: IMessage[] | undefined = historyMessage?.map((message) => {
                    if (message.id === data.payload.message.id) {
                        message.status.isReaded = true;
                    }

                    return message;
                });

                return updateHistoryMessage || [];
            });
        }
    };

    const responseEditMessage = (event: MessageEvent): void => {
        const data: IResponseEditMessage = JSON.parse(event.data);

        if (data.type === 'MSG_EDIT') {
            if (data.payload.message.status.isEdited) {
                setHistoryMessage((prevHistoryMessage) => {
                    const updateHistoryMessage: IMessage[] | null =
                        prevHistoryMessage?.map((message) => {
                            if (message.id === data.payload.message.id) {
                                message.status.isEdited = true;
                                message.text = data.payload.message.text;
                                return message;
                            }
                            return message;
                        }) || [];

                    return updateHistoryMessage;
                });
            }
        }
    };

    const responseDeliver = (event: MessageEvent): void => {
        const data: IResponseDelivered = JSON.parse(event.data);

        if (data.type === 'MSG_DELIVER') {
            setHistoryMessage((prevHistoryMessage) => {
                if (!prevHistoryMessage) return null;

                const updatedHistory: IMessage[] = prevHistoryMessage.map((message) => {
                    if (message.id === data.id) message.status.isDelivered = true;

                    return message;
                });

                return updatedHistory;
            });
        }
    };

    return {
        responseAuthorization,
        responseLogout,
        responseActiveUsers,
        responseInactiveUsers,
        responseSendMessage,
        responseHistoryMessage,
        responseDeleteMessage,
        responseReadMessage,
        responseEditMessage,
        responseDeliver,
    };
};

export default handleServerResponse;
