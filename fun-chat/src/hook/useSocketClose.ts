import React from 'react';

const useSocketClose = (
    isConnect: boolean,
    socket: WebSocket | null,
    setIsConnect: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
    React.useEffect(() => {
        if (!socket) return;

        const close = (): void => setIsConnect(false);

        socket.addEventListener('close', close);

        return () => socket.removeEventListener('close', close);
    }, [isConnect]);
};

export default useSocketClose;
