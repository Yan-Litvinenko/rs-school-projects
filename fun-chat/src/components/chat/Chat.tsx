import React from 'react';
import ChatHeader from '../chatHeader/ChatHeader';
import ChatAside from '../chatAside/ChatAside';
import ChatMessages from '../chatMessages/ChatMessages';
import { ContextApp } from '../app/App';
import { IContextApp } from '../../interface/interface.client';
import styles from './Chat.module.scss';

const Chat = (): React.JSX.Element => {
    const contextApp: IContextApp | null = React.useContext(ContextApp);

    if (!contextApp) return <></>;

    return (
        <main className={styles.main}>
            <div className={styles.main__inner}>
                <ChatHeader />
                {contextApp.isSmallScreen ? (
                    contextApp.mobileSectionActive === 'aside' ? (
                        <ChatAside />
                    ) : (
                        <ChatMessages />
                    )
                ) : (
                    <>
                        <ChatAside />
                        <ChatMessages />
                    </>
                )}
            </div>
        </main>
    );
};

export default Chat;
