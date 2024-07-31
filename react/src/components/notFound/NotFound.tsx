import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextApp } from '../../App.tsx';
import { IContextApp } from '../../interfaces/interface.app.ts';
import onSearch from '../../utils/onSearch.ts';
import styles from './NotFound.module.scss';

const NotFound = (): React.JSX.Element => {
    const contextApp: IContextApp | null = React.useContext(ContextApp);
    const navigate = useNavigate();

    if (!contextApp) return <></>;

    const homePage = (): void => {
        const resetActivePage: number = 1;

        onSearch({
            searchValue: contextApp.searchValue,
            activePage: resetActivePage,
            setLoadSearch: contextApp?.setLoadSearch,
            setSearchResult: contextApp?.setSearchResult,
            setAmountPages: contextApp?.setAmountPages,
            navigate,
        })();

        contextApp.setActiveHero(null);
        contextApp?.setActivePage(resetActivePage);
        contextApp?.setPagination({ first: 1, second: 2, third: 3 });
        contextApp.setErrorPage(false);

        navigate('/page/1');
    };

    return (
        <div className={styles.notFound}>
            <h1>404 - Страница не найдена.</h1>
            <p>К сожалению, страница, которую вы ищете, не существует.</p>
            <button className={styles.notFound__btn} onClick={homePage}>
                На главную
            </button>
        </div>
    );
};

export default NotFound;
