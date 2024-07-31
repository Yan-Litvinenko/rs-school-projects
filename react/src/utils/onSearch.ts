import React from 'react';
import { IResponseData, IResponseDataPeople } from '../interfaces/interface.api.ts';
import fetchApiData from './fetchApiData.ts';

interface IOnSearch {
    searchValue: string;
    activePage: number;
    loadSearch: boolean;
    setLoadSearch: React.Dispatch<boolean>;
    setSearchResult: React.Dispatch<React.SetStateAction<IResponseDataPeople[]>>;
    setAmountPages: React.Dispatch<React.SetStateAction<number | null>>;
    navigate: (path: string) => void;
}

const onSearch = (props: IOnSearch): (() => Promise<void>) | undefined => {
    const { loadSearch, setLoadSearch, activePage, setSearchResult, setAmountPages, navigate, searchValue } = props;

    if (!loadSearch) {
        const searchFetch = async (): Promise<void> => {
            const url: string = searchValue
                ? `https://swapi.dev/api/people/?search=${encodeURIComponent(searchValue.trimEnd())}&page=${activePage}`
                : `https://swapi.dev/api/people/?page=${activePage}`;

            setLoadSearch(true);

            try {
                const data: IResponseData | null = await fetchApiData(url);

                if (data) {
                    setSearchResult(data.results);
                    setAmountPages(Math.ceil(data.count / 10));
                } else {
                    navigate('ErrorPage');
                }
            } catch (error) {
                console.error(error);
            }

            setLoadSearch(false);
        };

        return searchFetch;
    }
};

export default onSearch;
