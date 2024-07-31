import { IDetail, IResponseDataPeople } from './interface.api.ts';

interface IContextApp {
    activeHero: null | number;
    activePage: number;
    amountPages: number | null;
    detail: IDetail | null;
    error: boolean;
    errorPage: boolean;
    loadDetail: boolean;
    loadSearch: boolean;
    maxElementsInPage: React.MutableRefObject<number>;
    pagination: IPagination;
    searchResult: IResponseDataPeople[];
    searchValue: string;
    setActiveHero: React.Dispatch<React.SetStateAction<null | number>>;
    setActivePage: React.Dispatch<React.SetStateAction<number>>;
    setAmountPages: React.Dispatch<React.SetStateAction<number | null>>;
    setDetail: React.Dispatch<React.SetStateAction<IDetail | null>>;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    setErrorPage: React.Dispatch<React.SetStateAction<boolean>>;
    setLoadDetail: React.Dispatch<React.SetStateAction<boolean>>;
    setLoadSearch: React.Dispatch<React.SetStateAction<boolean>>;
    setPagination: React.Dispatch<React.SetStateAction<IPagination>>;
    setSearchResult: React.Dispatch<React.SetStateAction<IResponseDataPeople[]>>;
    setSearchValue: (newValue: string) => void;
}

interface IPagination {
    first: number;
    second: number;
    third: number;
}

type PositionPagination = 'first' | 'second' | 'third';

export type { IContextApp, IPagination, PositionPagination };
