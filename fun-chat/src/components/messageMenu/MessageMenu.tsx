import React from 'react';
import { ContextApp } from '../app/App';
import handleCopy from '../../utils/handleCopy';
import handleSessionStorage from '../../utils/handleSessionStorage';
import { IContextApp } from '../../interface/interface.client';
import { IMessage } from '../../interface/interface.server';
import styles from './MessageMenu.module.scss';

interface IMessageMenu {
    whoseMessage: 'my' | 'companion';
    coordinate: {
        x: number;
        y: number;
    } | null;
    messageData: IMessage;
    setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageMenu = (props: IMessageMenu): React.JSX.Element => {
    const contextApp: IContextApp | null = React.useContext(ContextApp);

    if (!contextApp) return <></>;

    const isMyMessage: boolean = props.messageData.from === handleSessionStorage().getDataUserAccount().username;

    return (
        <ul className={styles.menu} style={{ left: `${props.coordinate?.x}px`, top: `${props.coordinate?.y}px` }}>
            {isMyMessage ? (
                <li
                    className={styles.menu__item}
                    onClick={() =>
                        contextApp.setEditMessage({ id: props.messageData.id, text: props.messageData.text })
                    }
                >
                    Редактировать
                </li>
            ) : null}
            {isMyMessage ? (
                <li className={styles.menu__item} onClick={() => contextApp.requestDeleteMessage(props.messageData.id)}>
                    Удалить
                </li>
            ) : null}
            <li className={styles.menu__item} onClick={() => handleCopy(props.messageData.text, props.setStatus)}>
                Копировать
            </li>
            <li
                className={styles.menu__item}
                onClick={() => {
                    contextApp.setMessageDetails(props.messageData);
                }}
            >
                Подробнее
            </li>
        </ul>
    );
};

export default MessageMenu;
