import React from 'react';
import { ContextApp } from '../../App.tsx';
import { IContextApp } from '../../interfaces/interface.app.ts';
import Loader from '../loader/Loader.tsx';
import { Link } from 'react-router-dom';
import styles from './Details.module.scss';

const Details = (): React.JSX.Element => {
    const contextApp = React.useContext<IContextApp | null>(ContextApp);

    if (!contextApp) return <></>;

    const close = () => {
        contextApp.setDetail(null);
        contextApp.setActiveHero(null);
    };

    return (
        <div className={styles.detail}>
            {contextApp.loadDetail ? <Loader /> : null}
            {contextApp.detail ? (
                <>
                    <ul>
                        <li>name: {contextApp.detail.name}</li>
                        <li>gender: {contextApp.detail.gender}</li>
                        <li>height: {contextApp.detail.height}</li>
                        <li>mass: {contextApp.detail.mass}</li>
                        <li>number: {contextApp.activeHero}</li>
                    </ul>
                    <Link to={`/page/${contextApp.activePage}`} onClick={close}>
                        Закрыть
                    </Link>
                </>
            ) : null}
        </div>
    );
};

export default Details;
