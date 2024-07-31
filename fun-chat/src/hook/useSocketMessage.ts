import React from 'react';
import handleServerResponse from '../utils/handleServerResponse';
import { IMessage } from '../interface/interface.server';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { IUser, IUserListUnreadMessage } from '../interface/interface.client';

const useSocketMessage = (
    isConnect: boolean,
    socket: WebSocket | null,
    setErrorLogin: React.Dispatch<React.SetStateAction<string | null>>,
    setUserList: React.Dispatch<React.SetStateAction<IUser[]>>,
    setUserListUnreadMessage: React.Dispatch<React.SetStateAction<IUserListUnreadMessage>>,
    handleUserAuthorization: (event: MessageEvent) => void,
    setHistoryMessage: React.Dispatch<React.SetStateAction<IMessage[] | null>>,
    setTargetUser: React.Dispatch<React.SetStateAction<IUser | null>>,
    requestHistoryMessage: (username: string) => void,
    historyMessage: IMessage[] | null,
    targetUser: IUser | null,
) => {
    const navigate: NavigateFunction = useNavigate();

    const {
        responseLogout,
        responseActiveUsers,
        responseInactiveUsers,
        responseSendMessage,
        responseHistoryMessage,
        responseDeleteMessage,
        responseReadMessage,
        responseEditMessage,
        responseDeliver,
    } = handleServerResponse(
        navigate,
        setErrorLogin,
        setUserList,
        setUserListUnreadMessage,
        setHistoryMessage,
        setTargetUser,
        requestHistoryMessage,
        historyMessage,
        targetUser,
    );

    React.useEffect(() => {
        socket?.addEventListener('message', responseLogout);
        socket?.addEventListener('message', handleUserAuthorization);
        socket?.addEventListener('message', responseActiveUsers);
        socket?.addEventListener('message', responseInactiveUsers);
        socket?.addEventListener('message', responseSendMessage);
        socket?.addEventListener('message', responseHistoryMessage);
        socket?.addEventListener('message', responseDeleteMessage);
        socket?.addEventListener('message', responseReadMessage);
        socket?.addEventListener('message', responseEditMessage);
        socket?.addEventListener('message', responseDeliver);

        return () => {
            socket?.removeEventListener('message', responseLogout);
            socket?.removeEventListener('message', handleUserAuthorization);
            socket?.removeEventListener('message', responseActiveUsers);
            socket?.removeEventListener('message', responseInactiveUsers);
            socket?.removeEventListener('message', responseSendMessage);
            socket?.removeEventListener('message', responseHistoryMessage);
            socket?.removeEventListener('message', responseDeleteMessage);
            socket?.removeEventListener('message', responseReadMessage);
            socket?.removeEventListener('message', responseEditMessage);
            socket?.removeEventListener('message', responseDeliver);
        };
    }, [isConnect, targetUser, historyMessage]);
};

export default useSocketMessage;
