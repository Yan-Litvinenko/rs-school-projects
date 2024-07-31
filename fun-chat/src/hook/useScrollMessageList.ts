import React from 'react';
import handleSessionStorage from '../utils/handleSessionStorage';
import { ContextApp } from '../components/app/App';
import { IContextApp } from '../interface/interface.client';
import { IResponseMessage } from '../interface/interface.response';

const useScrollMessageList = (messageList: HTMLUListElement | null) => {
    const contextApp: IContextApp | null = React.useContext(ContextApp);

    const watchSendMessage = (event: MessageEvent): void => {
        const data: IResponseMessage = JSON.parse(event.data);

        if (data.type === 'MSG_SEND') {
            const username: string = handleSessionStorage().getDataUserAccount().username;
            const companionName: string = contextApp?.targetUser?.login || '';

            if (messageList) {
                const isUserInvolved: boolean =
                    username === data.payload.message.to ||
                    username === data.payload.message.from ||
                    companionName === data.payload.message.to ||
                    companionName === data.payload.message.from;

                if (isUserInvolved) {
                    setTimeout(() => {
                        messageList.scrollTop = messageList.scrollHeight;
                    }, 0);
                }
            }
        }
    };

    React.useEffect(() => {
        contextApp?.socket?.addEventListener('message', watchSendMessage);
        return () => contextApp?.socket?.removeEventListener('message', watchSendMessage);
    }, [contextApp?.socket]);

    React.useEffect(() => {
        setTimeout(() => {
            if (messageList) {
                messageList.scrollTop = messageList.scrollHeight;
            }
        }, 0);
    }, [messageList, contextApp?.historyMessage]);
};

export default useScrollMessageList;
