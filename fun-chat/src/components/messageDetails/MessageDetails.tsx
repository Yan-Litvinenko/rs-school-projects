import React from 'react';
import getDateMessage from '../../utils/getDateMessage';
import { ContextApp } from '../app/App';
import { IContextApp } from '../../interface/interface.client';
import styles from './MessageDetails.module.scss';

const MessageDetails = (): React.JSX.Element => {
    const contentApp: IContextApp | null = React.useContext(ContextApp);

    if (!contentApp) return <></>;

    const cross = React.useRef<HTMLDivElement | null>(null);
    const details = React.useRef<HTMLDivElement | null>(null);

    const date: Record<string, string> = getDateMessage(contentApp.messageDetails?.datetime || 0);

    const handleCloseModal = (event: React.MouseEvent<HTMLDivElement>): void => {
        if (event.target === cross.current || event.target === details.current) {
            contentApp.setMessageDetails(null);
        }
    };

    return (
        <div className={styles.details} ref={details} onClick={handleCloseModal}>
            <div className={styles.details__inner}>
                <div className={styles.details__close} ref={cross} onClick={handleCloseModal}>
                    &#10006;
                </div>
                <h2 className={styles.details__title}>Информация о сообщении</h2>

                <ul className={styles.details__list}>
                    <li>От кого: {contentApp.messageDetails?.from}</li>
                    <li>Кому: {contentApp.messageDetails?.to}</li>
                    <li>Дата: {date.date}</li>
                    <li>Время: {date.time}</li>
                    <li>Редактировано: {contentApp.messageDetails?.status.isEdited ? 'Да' : 'Нет'}</li>
                    <li>Прочитано: {contentApp.messageDetails?.status.isReaded ? 'Да' : 'Нет'}</li>
                </ul>
            </div>
        </div>
    );
};

export default MessageDetails;
