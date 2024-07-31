import handleSessionStorage from './handleSessionStorage';
import { IUser, IUserAccount } from '../interface/interface.client';
import {
    IRequestAuthorization,
    IRequestDeleteMessage,
    IRequestEditMessage,
    IRequestHistoryMessage,
    IRequestMessage,
    IRequestReadMessage,
    IRequestUsers,
} from '../interface/interface.request';
import upperCaseFirstLetter from '../utils/upperCaseFirstLettes';
import { UseFormReturn } from 'react-hook-form';

interface UseServerRequest {
    requestAuthorization: (data: IUserAccount) => void;
    requestLogout: () => void;
    requestSwitchTarget: (user: IUser) => void;
    requestGetAllUsers: () => void;
    requestSendMessage: (data: Record<string, string>) => void;
    requestHistoryMessage: (username: string) => void;
    requestDeleteMessage: (id: string) => void;
    requestReadMessage: (id: string) => void;
    requestEditMessage: (id: string, text: string) => void;
}

const handleServerRequest = (
    socket: WebSocket | null,
    handleForm: UseFormReturn<IUserAccount, any, undefined>,
    targetUser: IUser | null,
    setTargetUser: React.Dispatch<React.SetStateAction<IUser | null>>,
): UseServerRequest => {
    const { setDataUserAccount, getDataUserAccount, removeDataUserAccount } = handleSessionStorage();

    const requestAuthorization = (data: IUserAccount): void => {
        const dataUser: IRequestAuthorization = {
            id: '',
            type: 'USER_LOGIN',
            payload: {
                user: {
                    login: upperCaseFirstLetter(data.username),
                    password: data.password,
                },
            },
        };

        handleForm.reset();
        setDataUserAccount(data);
        socket?.send(JSON.stringify(dataUser));
    };

    const requestLogout = (): void => {
        const accountUser: IUserAccount = getDataUserAccount();
        const logoutRequest: IRequestAuthorization = {
            id: '',
            type: 'USER_LOGOUT',
            payload: {
                user: {
                    login: upperCaseFirstLetter(accountUser.username),
                    password: accountUser.password,
                },
            },
        };

        removeDataUserAccount();

        handleForm.reset();
        socket?.send(JSON.stringify(logoutRequest));
    };

    const requestHistoryMessage = (username: string): void => {
        const historyMessageRequest: IRequestHistoryMessage = {
            id: '',
            type: 'MSG_FROM_USER',
            payload: {
                user: {
                    login: username,
                },
            },
        };
        socket?.send(JSON.stringify(historyMessageRequest));
    };

    const requestSwitchTarget = (user: IUser): void => {
        setTargetUser(user);
        requestHistoryMessage(user.login);
    };

    const requestGetAllUsers = (): void => {
        const requestForGetActiveUsers: IRequestUsers = {
            id: '',
            type: 'USER_ACTIVE',
            payload: null,
        };

        const requestForGetInAcitveUsers: IRequestUsers = {
            id: '',
            type: 'USER_INACTIVE',
            payload: null,
        };

        socket?.send(JSON.stringify(requestForGetActiveUsers));
        socket?.send(JSON.stringify(requestForGetInAcitveUsers));
    };

    const requestSendMessage = (data: Record<string, string>): void => {
        const message: IRequestMessage = {
            id: '',
            type: 'MSG_SEND',
            payload: {
                message: {
                    to: targetUser?.login || '',
                    text: data.message,
                },
            },
        };
        socket?.send(JSON.stringify(message));
    };

    const requestDeleteMessage = (id: string): void => {
        const deleteMessageRequest: IRequestDeleteMessage = {
            id: '',
            type: 'MSG_DELETE',
            payload: {
                message: {
                    id: id,
                },
            },
        };

        socket?.send(JSON.stringify(deleteMessageRequest));
    };

    const requestReadMessage = (id: string): void => {
        const messageReadRequest: IRequestReadMessage = {
            id: '',
            type: 'MSG_READ',
            payload: {
                message: {
                    id: id,
                },
            },
        };

        socket?.send(JSON.stringify(messageReadRequest));
    };

    const requestEditMessage = (id: string, text: string): void => {
        const messageEditRequest: IRequestEditMessage = {
            id: '',
            type: 'MSG_EDIT',
            payload: {
                message: {
                    id: id,
                    text: text,
                },
            },
        };

        socket?.send(JSON.stringify(messageEditRequest));
    };

    return {
        requestAuthorization,
        requestLogout,
        requestSwitchTarget,
        requestGetAllUsers,
        requestSendMessage,
        requestHistoryMessage,
        requestDeleteMessage,
        requestReadMessage,
        requestEditMessage,
    };
};

export default handleServerRequest;
