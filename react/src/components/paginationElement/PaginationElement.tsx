import React from 'react';
import onSearchFetchPage from '../../utils/onSearchFetchPage.ts';
import switchPagination from '../../utils/switchPagination.ts';
import { Link } from 'react-router-dom';
import { ContextApp } from '../../App.tsx';
import { IContextApp, PositionPagination } from '../../interfaces/interface.app.ts';
import styles from './PaginationElement.module.scss';

interface IPaginationElement {
    numberPage: number;
    position: PositionPagination;
}

const PaginationElement = (props: IPaginationElement): React.JSX.Element => {
    const contextApp = React.useContext<IContextApp | null>(ContextApp);

    if (!contextApp) return <></>;

    const { numberPage, position } = props;

    const handleClick = (): void => {
        if (contextApp.activePage === numberPage) return;

        if (!contextApp.loadSearch && !contextApp.loadDetail) {
            const searchApiPage = onSearchFetchPage(numberPage, contextApp.setLoadSearch, contextApp.setSearchResult);

            searchApiPage();
            contextApp.setDetail(null);
            contextApp.setActivePage(numberPage);
            contextApp.setActiveHero(null);
            switchPagination(position, numberPage, contextApp.amountPages, contextApp.setPagination);
        }
    };

    return (
        <Link
            to={`page/${numberPage}`}
            className={`${styles.element} ${contextApp.activePage === numberPage ? styles.element_active : ''}`}
            onClick={handleClick}
        >
            {numberPage}
        </Link>
    );
};

export default PaginationElement;
