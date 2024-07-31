import React from 'react';
import getDateMessage from '../../utils/getDateMessage';
import handleSessionStorage from '../../utils/handleSessionStorage';
import MessageMenu from '../messageMenu/MessageMenu';
import useMessageMenu from '../../hook/useMessageMenu';
import { IMessage } from '../../interface/interface.server';
import doubleCheck from '../../assets/images/doubleCheck.svg';
import check from '../../assets/images/check.svg';

interface IComponentMessage {
    messageData: IMessage;
    styles: Record<string, string>;
}

const Message = (props: IComponentMessage): React.JSX.Element => {
    const { messageData, styles } = props;
    const userName: string = handleSessionStorage().getDataUserAccount().username;

    const li = React.useRef<null | HTMLLIElement>(null);
    const whoseMessage = React.useRef<'my' | 'companion'>(messageData.from === userName ? 'my' : 'companion');

    const { open, close, coordinate, status, setStatus } = useMessageMenu(li);

    React.useEffect(() => {
        li.current?.addEventListener('contextmenu', open);
        window.addEventListener('click', close);
        window.addEventListener('contextmenu', close);

        return () => {
            li.current?.removeEventListener('contextmenu', open);
            window.removeEventListener('click', close);
            window.removeEventListener('contextmenu', close);
        };
    }, []);

    return (
        <li
            className={`${styles.message} ${whoseMessage.current === 'my' ? styles.message__my : styles.message__companion}`}
            data-id={messageData.id}
            data-readed={messageData.status.isReaded}
            data-user={whoseMessage.current === 'my' ? 'Вы' : messageData.from}
            ref={li}
        >
            {status ? (
                <MessageMenu
                    whoseMessage={whoseMessage.current}
                    coordinate={coordinate}
                    messageData={messageData}
                    setStatus={setStatus}
                />
            ) : null}
            <span className={styles.message__text}>{messageData.text}</span>
            <span
                className={` ${messageData.status.isEdited ? styles.message__box_info_edit : styles.message__box_info}`}
            >
                {messageData.status.isEdited ? <span className={styles.message__edit}>Изменено</span> : null}
                <span className={styles.message__time}>{getDateMessage(messageData.datetime).time}</span>
                {messageData.from === userName ? (
                    messageData.status.isReaded ? (
                        <img className={styles.check} src={doubleCheck} alt="check" />
                    ) : (
                        <img className={styles.check} src={check} alt="check" />
                    )
                ) : null}
            </span>
        </li>
    );
};

export default Message;
