import React from 'react';
import onSearch from '../../utils/onSearch.ts';
import { ContextApp } from '../../App.tsx';
import { IContextApp } from '../../interfaces/interface.app.ts';
import { useNavigate } from 'react-router-dom';
import styles from './Search.module.scss';

const Search = (): React.JSX.Element => {
    const contextApp = React.useContext<IContextApp | null>(ContextApp);

    const navigate = useNavigate();

    if (!contextApp) return <></>;

    const handleClick = () => {
        const resetActivePage: number = 1;
        const search = onSearch({
            searchValue: contextApp.searchValue,
            activePage: resetActivePage,
            loadSearch: contextApp.loadSearch,
            setLoadSearch: contextApp?.setLoadSearch,
            setSearchResult: contextApp?.setSearchResult,
            setAmountPages: contextApp.setAmountPages,
            navigate,
        });

        if (search) search();

        contextApp.setActivePage(resetActivePage);
        contextApp.setPagination({ first: 1, second: 2, third: 3 });
    };

    return (
        <section className={styles.search}>
            <input
                className={styles.search__input}
                onChange={(event) => contextApp.setSearchValue(event.target.value)}
                placeholder="Введите запрос"
                type="search"
                value={contextApp.searchValue}
            />
            <button
                className={styles.search__btn}
                type="button"
                onClick={handleClick}
                disabled={contextApp?.loadSearch}
            >
                Поиск
            </button>
        </section>
    );
};

export default Search;
