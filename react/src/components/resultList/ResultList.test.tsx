import '@testing-library/jest-dom';
import ResultList from './ResultList.tsx';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ContextApp } from '../../App.tsx';
import { IContextApp } from '../../interfaces/interface.app.ts';
import { IResponseDataPeople } from '../../interfaces/interface.api.ts';

describe('ResultList component', () => {
    const mockContextData = {
        searchResult: [] as IResponseDataPeople[],
    };

    beforeEach(() => (mockContextData.searchResult = []));

    it('should render at least 1 and no more than 10 result elements', () => {
        mockContextData.searchResult.push({
            name: 'Luke Skywalker',
            url: 'https://swapi.dev/api/people/1/',
        } as IResponseDataPeople);

        const { getAllByRole } = render(
            <MemoryRouter>
                <ContextApp.Provider value={mockContextData as IContextApp}>
                    <ResultList />
                </ContextApp.Provider>
            </MemoryRouter>,
        );

        const amountElements: HTMLElement[] = getAllByRole('link');

        expect(amountElements.length).toBeGreaterThanOrEqual(1);
        expect(amountElements.length).toBeLessThanOrEqual(10);
    });

    it('Should render text "Персонаж не найден"', () => {
        const { getByText } = render(
            <MemoryRouter>
                <ContextApp.Provider value={mockContextData as IContextApp}>
                    <ResultList />
                </ContextApp.Provider>
            </MemoryRouter>,
        );

        const сharacterNotFound: HTMLElement = getByText('Персонаж не найден');

        expect(сharacterNotFound).toBeInTheDocument();
    });
});
