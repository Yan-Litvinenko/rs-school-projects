import React from 'react';
import { IResponseData, IResponseDataPeople } from '../interfaces/interface.api.ts';

import fetchApiData from './fetchApiData.ts';

const onSearchFetchPage = (
    pageNumber: number,
    setLoadSearch: React.Dispatch<boolean>,
    setSearchResult: React.Dispatch<React.SetStateAction<IResponseDataPeople[]>>,
): (() => Promise<void>) => {
    const searchFetch = async (): Promise<void> => {
        const url: string = `https://swapi.dev/api/people/?page=${pageNumber}`;

        try {
            setLoadSearch(true);

            const data: IResponseData | null = await fetchApiData(url);

            setLoadSearch(false);

            if (data) {
                setSearchResult(data.results);
                return;
            }
        } catch (error) {
            console.error(error);
        }
    };

    return searchFetch;
};

export default onSearchFetchPage;
