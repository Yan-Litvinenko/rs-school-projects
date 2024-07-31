import '@testing-library/jest-dom';
import ResultElement from './ResultElement';
import { describe, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { ContextApp } from '../../App';
import fetchApiData from '../../utils/fetchApiData';
import Details from '../details/Details';
import { IContextApp } from '../../interfaces/interface.app';

describe('ResultElement component', () => {
    vi.mock('../../utils/fetchApiData', () => ({
        default: vi.fn(),
    }));

    it('Should render character data', () => {
        const props = { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' };
        const { getByText } = render(
            <MemoryRouter>
                <ResultElement {...props} />
            </MemoryRouter>,
        );
        const resultElement: HTMLElement = getByText(props.name);
        expect(resultElement).toBeInTheDocument();
    });

    it('Should make an additional API call on click', async () => {
        const props = { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' };

        const { getByText } = render(
            <MemoryRouter>
                <ResultElement {...props} />
            </MemoryRouter>,
        );

        const resultElement: HTMLElement = getByText(props.name);
        fireEvent.click(resultElement);

        expect(fetchApiData).toHaveBeenCalledWith(props.url);
    });

    it('Should adds a section with character details', async () => {
        const props = { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' };
        const mockDetail = {
            name: 'Luke Skywalker',
            gender: 'male',
            height: '172',
            mass: '77',
        };
        const mockContext = {
            activeHero: 1,
            activePage: 1,
            detail: mockDetail,
            loadDetail: false,
        };

        (fetchApiData as jest.Mock).mockResolvedValue(mockDetail);

        const { getByText } = render(
            <ContextApp.Provider value={mockContext as IContextApp}>
                <MemoryRouter>
                    <ResultElement {...props} />
                    <Details />
                </MemoryRouter>
            </ContextApp.Provider>,
        );

        const resultElement: HTMLElement = getByText(props.name);
        fireEvent.click(resultElement);

        expect(fetchApiData).toHaveBeenCalledWith(props.url);

        await waitFor(() => {
            const name = screen.getByText(`name: ${mockDetail.name}`);
            const gender = screen.getByText(`gender: ${mockDetail.gender}`);
            const height = screen.getByText(`height: ${mockDetail.height}`);
            const mass = screen.getByText(`mass: ${mockDetail.mass}`);
            const number = screen.getByText(`number: ${mockContext.activeHero}`);

            expect(name).toBeInTheDocument();
            expect(gender).toBeInTheDocument();
            expect(height).toBeInTheDocument();
            expect(mass).toBeInTheDocument();
            expect(number).toBeInTheDocument();
        });
    });
});
