import React from 'react';

const useSocketError = (socket: WebSocket | null, isConnect: boolean): void => {
    React.useEffect(() => {
        const error = (event: Event): void => console.error('WebSocket error:', event);

        socket?.addEventListener('error', error);

        return () => socket?.removeEventListener('error', error);
    }, [socket, isConnect]);
};

export default useSocketError;
