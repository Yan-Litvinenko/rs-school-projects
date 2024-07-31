import React from 'react';
import PaginationElement from '../paginationElement/PaginationElement.tsx';
import { ContextApp } from '../../App.tsx';
import { IContextApp } from '../../interfaces/interface.app.ts';
import styles from './Pagination.module.scss';

const Pagination = (): React.JSX.Element => {
    const contextApp = React.useContext<IContextApp | null>(ContextApp);

    if (!contextApp) return <></>;

    return contextApp.errorPage ? (
        <></>
    ) : (
        <>
            {contextApp.amountPages === 1 ? (
                <></>
            ) : (
                <div className={styles.pagination}>
                    <PaginationElement numberPage={contextApp.pagination.first} position="first" />
                    {Number(contextApp.amountPages) >= 2 ? (
                        <PaginationElement numberPage={contextApp.pagination.second} position="second" />
                    ) : null}
                    {Number(contextApp.amountPages) >= 3 ? (
                        <PaginationElement numberPage={contextApp.pagination.third} position="third" />
                    ) : null}
                </div>
            )}
        </>
    );
};

export default Pagination;
