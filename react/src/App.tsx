import React from 'react';
import useInitSearch from './hook/useInitSearch.ts';
import useLocalStorage from './hook/useLocalStorage.ts';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary.tsx';
import Search from './components/search/Search.tsx';
import SearchResult from './components/searchResult/SearchResult.tsx';
import ThrowErrorButton from './components/throwErrorButton/ThrowErrorButton.tsx';
import Pagination from './components/pagination/Pagination.tsx';
import { IContextApp } from './interfaces/interface.app.ts';
import styles from './App.module.scss';

const ContextApp = React.createContext<IContextApp | null>(null);

const App = (): React.JSX.Element => {
    const maxElementsInPage = React.useRef<number>(10);

    const [searchValue, setSearchValue] = useLocalStorage('darth-vader/rs-school-react-2024/search', '');
    const [error, setError] = React.useState<boolean>(false);
    const [errorPage, setErrorPage] = React.useState<boolean>(false);
    const [loadDetail, setLoadDetail] = React.useState<boolean>(false);
    const [loadSearch, setLoadSearch] = React.useState<boolean>(false);

    const initConfig = useInitSearch(loadSearch, setLoadSearch, setLoadDetail, setErrorPage);

    React.useEffect(() => {
        return () => setSearchValue(searchValue);
    }, []);

    return (
        <ErrorBoundary>
            <ContextApp.Provider
                value={{
                    activeHero: initConfig.activeHero,
                    activePage: initConfig.activePage,
                    amountPages: initConfig.amountPages,
                    detail: initConfig.detail,
                    error,
                    errorPage,
                    loadDetail,
                    loadSearch,
                    maxElementsInPage,
                    pagination: initConfig.pagination,
                    searchResult: initConfig.searchResult,
                    searchValue,
                    setActiveHero: initConfig.setActiveHero,
                    setActivePage: initConfig.setActivePage,
                    setAmountPages: initConfig.setAmountPages,
                    setDetail: initConfig.setDetail,
                    setError,
                    setErrorPage,
                    setLoadDetail,
                    setLoadSearch,
                    setPagination: initConfig.setPagination,
                    setSearchResult: initConfig.setSearchResult,
                    setSearchValue,
                }}
            >
                <div className={styles.wrapper}>
                    <ThrowErrorButton />
                    <Search />
                    <SearchResult />
                    <Pagination />
                </div>
            </ContextApp.Provider>
        </ErrorBoundary>
    );
};

export { ContextApp };
export default App;
