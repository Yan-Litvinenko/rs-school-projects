import React from 'react';
import ResultElement from '../resultElement/ResultElement.tsx';
import { ContextApp } from '../../App.tsx';
import { IContextApp } from '../../interfaces/interface.app.ts';
import styles from './ResultList.module.scss';

const ResultList = (): React.JSX.Element => {
    const contextApp = React.useContext<IContextApp | null>(ContextApp);

    if (!contextApp) return <></>;

    return (
        <ul className={styles.list}>
            {contextApp.searchResult.length ? (
                contextApp.searchResult.map((element) => {
                    return <ResultElement key={element.name} name={element.name} url={element.url} />;
                })
            ) : (
                <div className={styles.notResult}>Персонаж не найден</div>
            )}
        </ul>
    );
};

export default ResultList;
