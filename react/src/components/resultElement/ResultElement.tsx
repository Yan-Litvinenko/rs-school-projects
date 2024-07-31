import React from 'react';
import fetchApiData from '../../utils/fetchApiData.ts';
import getNumberHeroFromUrl from '../../utils/getNumberHeroFromUrl.ts';
import { Link } from 'react-router-dom';
import { ContextApp } from '../../App.tsx';
import { IContextApp } from '../../interfaces/interface.app.ts';
import { IDetail } from '../../interfaces/interface.api.ts';
import styles from './ResultElement.module.scss';

interface IResultElement {
    name: string;
    url: string;
}

const ResultElement = (props: IResultElement): React.JSX.Element => {
    const { name, url } = props;

    const contextApp = React.useContext<IContextApp | null>(ContextApp);
    const numberActiveHero = getNumberHeroFromUrl(url);

    const handleClick = async (): Promise<void> => {
        if (contextApp?.activeHero === numberActiveHero) return;
        if (!contextApp?.loadDetail) {
            contextApp?.setLoadDetail(true);

            try {
                const data: IDetail | null = await fetchApiData<IDetail | null>(url);
                contextApp?.setActiveHero(numberActiveHero);
                contextApp?.setDetail(data);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            } finally {
                contextApp?.setLoadDetail(false);
            }
        }
    };

    return (
        <Link
            to={`/page/${contextApp?.activePage}/detail/${numberActiveHero}`}
            className={`${styles.element} ${numberActiveHero === contextApp?.activeHero ? styles.element_active : ''}`}
            onClick={handleClick}
        >
            {name}
        </Link>
    );
};

export default ResultElement;
