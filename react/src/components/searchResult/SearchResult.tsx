import React from 'react';
import Loader from '../loader/Loader.tsx';
import { Outlet } from 'react-router-dom';
import { ContextApp } from '../../App.tsx';
import { IContextApp } from '../../interfaces/interface.app.ts';
import styles from './SearchResult.module.scss';

const SearchResult = (): React.JSX.Element => {
    const contextApp = React.useContext<IContextApp | null>(ContextApp);

    if (!contextApp) return <></>;

    return (
        <section className={styles.result}>
            {!contextApp.loadSearch ? (
                <>
                    <Outlet />
                </>
            ) : (
                <Loader />
            )}
        </section>
    );
};

export default SearchResult;
