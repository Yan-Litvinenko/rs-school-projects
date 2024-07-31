import React from 'react';

const useSocket = (isConnect: boolean, setSocket: React.Dispatch<React.SetStateAction<WebSocket | null>>) => {
    const newSocket: WebSocket = new WebSocket('ws://localhost:4000');

    React.useEffect(() => {
        if (!isConnect) setSocket(newSocket);
    }, [isConnect]);
};

export default useSocket;
