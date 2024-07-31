import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import styles from './Information.module.scss';

const Information = (): React.JSX.Element => {
    const navigate: NavigateFunction = useNavigate();
    const handleBack = (): void => navigate(-1);

    return (
        <div className={styles.information}>
            <div className={styles.information__inner}>
                <h1 className={styles.information__title}>Информация о приложении</h1>
                <ol className={styles.information__list_main}>
                    <li className={styles.information__item_main}>
                        Цель
                        <ol className={styles.information__list_second}>
                            <li className={styles.information__item_second}>
                                Познакомиться с протоколом подключения WebSocket
                            </li>
                            <li className={styles.information__item_second}>
                                Получить опыт работы с соединением, при котором как клиентские, так и серверные
                                приложения могут инициировать отправку сообщений
                            </li>
                            <li className={styles.information__item_second}>
                                Совершенствование навыков работы с асинхронными запросами
                            </li>
                            <li className={styles.information__item_second}>
                                Совершенствование навыков работы с React
                            </li>
                        </ol>
                    </li>
                    <li className={styles.information__item_main}>
                        Не баг, а фича (так и было задумано)
                        <ol className={styles.information__list_second}>
                            <li className={styles.information__item_second}>
                                Удалить возможно только своё сообщение (удаляется и у собеседника)
                            </li>
                            <li className={styles.information__item_second}>
                                Каждое имя уникально (Не может быть пользователей с одинаковым именем)
                            </li>
                            <li className={styles.information__item_second}>
                                Удаление пользователей и сообщений происходит один раз в сутки
                            </li>
                        </ol>
                    </li>
                    <li className={styles.information__item_main}>
                        Как пользоваться?
                        <ol className={styles.information__list_second}>
                            <li className={styles.information__item_second}>
                                Пользователь существует только в рамках текущей вкладки браузера (1 вкладка = 1
                                пользователь. Зайдя с 2 вкладок будет 2 пользователя)
                            </li>
                            <li className={styles.information__item_second}>
                                Пользователь не видит себя в списке пользователей на панели
                            </li>
                        </ol>
                    </li>
                    <li className={styles.information__item_main}>
                        Если вы нашли баг, пожалуйста, напишите мне:
                        <ol className={styles.information__list_second}>
                            <li className={styles.information__item_second}>
                                <a
                                    className={styles.information__link}
                                    href="https://www.instagram.com/borodistq/"
                                    target="_blank"
                                >
                                    Instagram
                                </a>
                            </li>
                            <li className={styles.information__item_second}>
                                <a
                                    className={styles.information__link}
                                    href="https://t.me/xDarth_Vaderx"
                                    target="_blank"
                                >
                                    Telegram
                                </a>
                            </li>
                            <li className={styles.information__item_second}>
                                <a className={styles.information__link} href="https://pixelpulse.by" target="_blank">
                                    Личный веб-сайт
                                </a>
                            </li>
                        </ol>
                    </li>
                </ol>

                <button className={styles.back} onClick={handleBack}>
                    Назад
                </button>
            </div>
        </div>
    );
};

export default Information;
