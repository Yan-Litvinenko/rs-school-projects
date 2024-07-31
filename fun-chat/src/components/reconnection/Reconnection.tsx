import React from 'react';
import styles from './Reconnection.module.scss';

const Reconnection = (): React.JSX.Element => {
    return (
        <div className={styles.reconnection}>
            <div className={styles.reconnection__inner}>
                <h2 className={styles.reconnection__title}>Соединение с сервером разорвано</h2>
                <p className={styles.reconnection__text}>Повторное подключение...</p>
            </div>
        </div>
    );
};

export default Reconnection;
