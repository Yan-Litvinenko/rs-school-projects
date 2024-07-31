import React from 'react';
import { IUser } from '../interface/interface.client';
import { IMessage } from '../interface/interface.server';
import { IResponseAuthorization } from '../interface/interface.response';

const useLogoutClean = (
    socket: WebSocket | null,
    setTargetUser: React.Dispatch<React.SetStateAction<IUser | null>>,
    setMessageHistory: React.Dispatch<React.SetStateAction<IMessage[] | null>>,
) => {
    React.useEffect(() => {
        const clean = (event: MessageEvent) => {
            const data: IResponseAuthorization = JSON.parse(event.data);

            if (data.type === 'USER_LOGOUT') {
                setTargetUser(null);
                setMessageHistory(null);
            }
        };

        socket?.addEventListener('message', clean);
        return () => socket?.removeEventListener('message', clean);
    }, [socket]);
};

export default useLogoutClean;
