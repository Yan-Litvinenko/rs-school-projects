import React from 'react';
import { Link } from 'react-router-dom';
import { ContextApp } from '../app/App';
import { IContextApp } from '../../interface/interface.client';
import styles from './Authorization.module.scss';

const Authorization = (): React.JSX.Element => {
    const contextApp = React.useContext<IContextApp | null>(ContextApp);

    if (!contextApp) return <></>;

    return (
        <form
            className={styles.authorization}
            autoComplete="off"
            onSubmit={contextApp.handleFormLogin.handleSubmit(contextApp.onSubmitFormLogin)}
        >
            <div className={styles.authorization__inner}>
                <h1 className={styles.authorization__title}>Авторизация</h1>
                <div className={styles.authorization__content}>
                    <label className={styles.authorization__label}>
                        <input
                            autoComplete="new-username"
                            className={styles.authorization__input}
                            placeholder="Имя"
                            type="text"
                            {...contextApp.handleFormLogin.register('username', {
                                required: true,
                                minLength: {
                                    value: 2,
                                    message: 'Имя не может быть короче двух символов',
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Имя не может быть длиннее 20 символов',
                                },
                                pattern: {
                                    value: /^[A-Za-zА-ЯЁа-яё]+$/i,
                                    message: 'Имя может содержать буквы кириллицы или латинского алфавита',
                                },
                            })}
                        />
                        {contextApp.handleFormLogin.formState.errors.username ? (
                            <span
                                className={styles.authorization__error}
                            >{`${contextApp.handleFormLogin.formState.errors.username?.message}`}</span>
                        ) : null}
                    </label>

                    <label className={styles.authorization__label}>
                        <input
                            autoComplete="new-password"
                            className={styles.authorization__input}
                            placeholder="Пароль"
                            type="password"
                            {...contextApp.handleFormLogin.register('password', {
                                required: true,
                                minLength: {
                                    value: 5,
                                    message: 'Пароль не может быть короче пяти символов',
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Пароль не может быть длиннее 20 символов',
                                },
                                pattern: {
                                    value: /^[A-Za-zА-ЯЁа-яё0-9]+$/i,
                                    message: 'Пароль может содержать буквы кириллицы, латинского алфавита или цифры',
                                },
                            })}
                        />
                        {contextApp.handleFormLogin.formState.errors.password ? (
                            <span
                                className={styles.authorization__error}
                            >{`${contextApp.handleFormLogin.formState.errors.password?.message}`}</span>
                        ) : null}

                        {contextApp.errorLogin ? (
                            <span className={styles.authorization__error}>{contextApp.errorLogin}</span>
                        ) : null}
                    </label>

                    <div className={styles.authorization__link_box}>
                        <button
                            className={`${styles.authorization__link} ${styles.authorization__link_login} ${!contextApp.handleFormLogin.formState.isValid ? styles.authorization__deactive : ''}`}
                            type="submit"
                            disabled={!contextApp.handleFormLogin.formState.isValid}
                        >
                            Войти
                        </button>
                        <Link
                            className={`${styles.authorization__link} ${styles.authorization__link_info}`}
                            to={'information'}
                        >
                            Информация
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Authorization;
