import React from 'react';
import { ContextApp } from '../components/app/App';
import { IContextApp } from '../interface/interface.client';
import { IMessage } from '../interface/interface.server';

const useReadedMessage = (messageList: null | HTMLUListElement, messageStyles: Record<string, string>) => {
    const contextApp: IContextApp | null = React.useContext(ContextApp);

    const isElementInViewport = (message: Element, list: null | HTMLUListElement): boolean | undefined => {
        if (!list) return;

        const messageRect: DOMRect = message.getBoundingClientRect();
        const listRect: DOMRect = list?.getBoundingClientRect();

        return messageRect.top >= listRect.top && messageRect.bottom <= listRect.bottom;
    };

    const handleActionForReadMessage = (): void => {
        const messages: NodeListOf<Element> = document.querySelectorAll(`.${messageStyles.message}`);

        messages.forEach((message: Element) => {
            const id: string = message.getAttribute('data-id') || '';
            const unread: boolean = message.getAttribute('data-readed') === 'false';
            const whoseMessage: boolean = message.getAttribute('data-user') !== 'Вы';

            if (unread && isElementInViewport(message, messageList) && whoseMessage) {
                const companionName: string = message.getAttribute('data-user') || '';

                contextApp?.requestReadMessage(id);
                contextApp?.setHistoryMessage((prev) => {
                    if (prev) {
                        const updatedHistory: IMessage[] = [...prev];
                        const messageIndex: number = updatedHistory.findIndex((msg) => msg.id === id);

                        if (messageIndex !== -1) {
                            updatedHistory[messageIndex].status.isReaded = true;
                        }

                        return updatedHistory;
                    }

                    return prev;
                });

                contextApp?.setUserListUnreadMessage((prev) => {
                    return { ...prev, [companionName]: prev[companionName] - 1 };
                });
            }
        });
    };

    React.useEffect(() => {
        if (!messageList) return;

        messageList?.addEventListener('scroll', handleActionForReadMessage);
        handleActionForReadMessage();

        return () => {
            messageList?.removeEventListener('scroll', handleActionForReadMessage);
        };
    }, [contextApp?.historyMessage, contextApp?.userListUnreadMessage]);
};

export default useReadedMessage;
