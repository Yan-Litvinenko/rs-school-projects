import React from 'react';
import { ContextApp } from '../app/App';
import { nanoid } from 'nanoid';
import Message from '../message/Message';
import MessageDetails from '../messageDetails/MessageDetails';
import useReadedMessage from '../../hook/useReadedMessage';
import useScrollMessageList from '../../hook/useScrollMessageList';
import { IContextApp } from '../../interface/interface.client';
import styles from './ChatMessages.module.scss';

const statusUser: Record<string, string> = {
    active: 'В сети',
    inactive: 'Не в сети',
};

const ChatMessages = (): React.JSX.Element => {
    const contextApp = React.useContext<IContextApp | null>(ContextApp);

    if (!contextApp) return <></>;

    const messageList = React.useRef<null | HTMLUListElement>(null);

    useReadedMessage(messageList.current, styles);
    useScrollMessageList(messageList.current);

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                {contextApp.targetUser?.login ? (
                    <>
                        {contextApp.isSmallScreen ? (
                            <button
                                type="button"
                                className={styles.header__arrow}
                                onClick={() => {
                                    contextApp.setTargetUser(null);
                                    contextApp.setMobileSectionActive('aside');
                                }}
                            >
                                &larr;
                            </button>
                        ) : null}
                        <div className={styles.header__username}>
                            {contextApp.targetUser ? contextApp.targetUser?.login : null}
                        </div>
                        <div
                            className={`${contextApp.targetUser?.isLogined ? styles.header__status_active : styles.header__status_deactive}`}
                        >
                            {contextApp.targetUser?.isLogined ? statusUser.active : statusUser.inactive}
                        </div>
                    </>
                ) : null}
            </div>

            <ul className={styles.messages} ref={messageList}>
                {contextApp.historyMessage?.length ? (
                    contextApp.historyMessage.map((message) => {
                        return <Message key={nanoid()} messageData={message} styles={styles} />;
                    })
                ) : (
                    <li className={styles.first_message}>Напишите первое сообщение...</li>
                )}
            </ul>
            <form
                className={styles.form}
                onSubmit={contextApp.handleFormMessage.handleSubmit(contextApp.onSubmitFormMessage)}
            >
                <input
                    autoComplete="off"
                    className={styles.form__input}
                    placeholder="Введите сообщение..."
                    type="text"
                    {...contextApp.handleFormMessage.register('message', {
                        required: true,
                        minLength: {
                            value: 1,
                            message: 'Нельзя отправить пустое сообщение!',
                        },
                        maxLength: {
                            value: 1000,
                            message: 'Сообщение не может превышать 1000 символов',
                        },
                    })}
                />
                <button
                    className={`${styles.form__btn} ${contextApp.targetUser ? (!contextApp.handleFormMessage.formState.isValid ? styles.form__btn_deactive : '') : styles.form__btn_deactive}`}
                    type="submit"
                    disabled={contextApp.targetUser?.login ? !contextApp.handleFormMessage.formState.isValid : true}
                >
                    {contextApp.editMessage ? 'Сохранить' : 'Отправить'}
                </button>
            </form>

            {contextApp.messageDetails ? <MessageDetails /> : null}
        </div>
    );
};

export default ChatMessages;
