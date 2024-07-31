import React from 'react';
import onSearch from '../utils/onSearch.ts';
import initDetail from '../utils/initDetail.ts';
import initPagination from '../utils/initPagination.ts';
import { IResponseDataPeople, IDetail } from '../interfaces/interface.api.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { IPagination } from '../interfaces/interface.app.ts';
import getNumberHeroFromUrl from '../utils/getNumberHeroFromUrl.ts';

interface UseInitSearch {
    activeHero: null | number;
    activePage: number;
    amountPages: number | null;
    pagination: IPagination;
    searchResult: IResponseDataPeople[];
    detail: null | IDetail;
    setActiveHero: React.Dispatch<React.SetStateAction<null | number>>;
    setActivePage: React.Dispatch<React.SetStateAction<number>>;
    setAmountPages: React.Dispatch<React.SetStateAction<number | null>>;
    setDetail: React.Dispatch<React.SetStateAction<IDetail | null>>;
    setPagination: React.Dispatch<React.SetStateAction<IPagination>>;
    setSearchResult: React.Dispatch<React.SetStateAction<IResponseDataPeople[]>>;
}

const useInitSearch = (
    loadSearch: boolean,
    setLoadSearch: React.Dispatch<boolean>,
    setLoadDetail: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorPage: React.Dispatch<React.SetStateAction<boolean>>,
): UseInitSearch => {
    const [activePage, setActivePage] = React.useState<number>(1);
    const [amountPages, setAmountPages] = React.useState<number | null>(null);
    const [pagination, setPagination] = React.useState<IPagination>({ first: 1, second: 2, third: 3 });
    const [detail, setDetail] = React.useState<null | IDetail>(null);
    const [activeHero, setActiveHero] = React.useState<null | number>(null);
    const [searchResult, setSearchResult] = React.useState<IResponseDataPeople[]>([]);

    const location = useLocation();
    const navigate = useNavigate();

    const breakIntoPieces = (): { path: string; numberPage: number; numberDetail: number } => {
        const path: string[] = location.pathname.slice(1).split('/');
        return { path: path.join(''), numberPage: Number(path[1]), numberDetail: Number(path[3]) };
    };

    const { path, numberPage, numberDetail } = breakIntoPieces();

    React.useEffect(() => {
        const searchValue: string = JSON.parse(localStorage.getItem('darth-vader/rs-school-react-2024/search') || '');
        (async () => {
            const correctDetail: boolean = searchResult.some((item) => getNumberHeroFromUrl(item.url) === numberDetail);
            const correctPage: boolean = numberPage >= 1 && numberPage <= (amountPages || 9);

            if (path === '') {
                navigate(`/page/1/`);
            } else if (!correctPage) {
                setErrorPage(true);
                navigate(`ErrorPage`);
            } else if (Number.isNaN(numberDetail)) {
                if (numberPage) {
                    navigate(`/page/${numberPage}/`);
                }
            } else if (!Number.isNaN(numberDetail)) {
                if (correctDetail && numberPage) {
                    initDetail({ numberDetail, setActiveHero, setDetail, setLoadDetail });
                    navigate(`/page/${numberPage}/detail/${numberDetail}`);
                } else if (!correctDetail && searchResult.length) {
                    setErrorPage(true);
                    navigate(`ErrorPage`);
                }
            } else {
                setErrorPage(true);
                navigate(`ErrorPage`);
            }

            const search = onSearch({
                searchValue,
                activePage: numberPage || 1,
                loadSearch,
                setLoadSearch,
                setSearchResult,
                setAmountPages,
                navigate,
            });

            if (search) search();

            setActivePage(numberPage || 1);
        })();
    }, [amountPages]);

    React.useEffect(() => {
        initPagination(numberPage || 1, setPagination, amountPages);
    }, [amountPages]);

    return {
        activeHero,
        activePage,
        amountPages,
        detail,
        pagination,
        searchResult,
        setActiveHero,
        setActivePage,
        setAmountPages,
        setDetail,
        setPagination,
        setSearchResult,
    };
};

export default useInitSearch;
