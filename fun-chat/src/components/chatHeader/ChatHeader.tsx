import React from 'react';
import { Link } from 'react-router-dom';
import handleSessionStorage from '../../utils/handleSessionStorage';
import { ContextApp } from '../app/App';
import { IContextApp } from '../../interface/interface.client';
import styles from './ChatHeader.module.scss';

const ChatHeader = (): React.JSX.Element => {
    const contextApp: IContextApp | null = React.useContext(ContextApp);

    if (!contextApp) return <></>;

    return (
        <header className={styles.header}>
            <div className={styles.header__user}>
                {contextApp.isSmallScreen ? '' : 'Ваше имя:'}{' '}
                <span>{handleSessionStorage().getDataUserAccount().username}</span>
            </div>
            <div className={styles.header__app_name}>Чат</div>
            <div className={styles.header__box}>
                <Link className={styles.header__btn} to={'/information'}>
                    Информация
                </Link>
                <button className={styles.header__btn} onClick={contextApp.requestLogout}>
                    Выход
                </button>
            </div>
        </header>
    );
};

export default ChatHeader;
