import React from 'react';
import { IUserAccount } from '../interface/interface.client';
import handleSessionStorage from '../utils/handleSessionStorage';

const useSocketOpen = (
    isConnect: boolean,
    socket: WebSocket | null,
    setIsConnect: React.Dispatch<React.SetStateAction<boolean>>,
    requestAuthorization: (data: IUserAccount) => void,
): void => {
    React.useEffect(() => {
        const open = (): void => {
            const account: IUserAccount = handleSessionStorage().getDataUserAccount();

            if (account.username) {
                requestAuthorization(account);
            }

            setIsConnect(true);
        };
        socket?.addEventListener('open', open);

        return () => socket?.removeEventListener('open', open);
    }, [isConnect, socket]);
};

export default useSocketOpen;
