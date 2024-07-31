import { ContextApp } from '../../App';
import { describe, it, expect } from 'vitest';
import { IContextApp } from '../../interfaces/interface.app';
import { IDetail } from '../../interfaces/interface.api';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Details from './Details';
import SelectACharacter from '../selectACharacter/SelectACharacter';
import stylesLoader from '../loader/Loader.module.scss';
import '@testing-library/jest-dom';

describe('Details component', () => {
    it('Should there is a loader when loading data', () => {
        const mockContext = {
            loadDetail: true,
        };

        const { container } = render(
            <ContextApp.Provider value={mockContext as IContextApp}>
                <Details />
            </ContextApp.Provider>,
        );

        const loader = container.querySelector(`.${stylesLoader.loader}`);
        expect(loader).toBeInTheDocument();
    });

    it('Should show correct data', () => {
        const mockContext = {
            detail: {
                name: 'Darth Vader',
                gender: 'male',
                height: '202',
                mass: '136',
            } as IDetail,
            activeHero: 4,
        };

        const { getByText } = render(
            <ContextApp.Provider value={mockContext as IContextApp}>
                <MemoryRouter>
                    <Details />
                </MemoryRouter>
            </ContextApp.Provider>,
        );

        const name = getByText(`name: ${mockContext.detail.name}`);
        const gender = getByText(`gender: ${mockContext.detail.gender}`);
        const height = getByText(`height: ${mockContext.detail.height}`);
        const mass = getByText(`mass: ${mockContext.detail.mass}`);
        const number = getByText(`number: ${mockContext.activeHero}`);

        expect(name).toBeInTheDocument();
        expect(gender).toBeInTheDocument();
        expect(height).toBeInTheDocument();
        expect(mass).toBeInTheDocument();
        expect(number).toBeInTheDocument();
    });

    it('Should close details', () => {
        const mockContext = {
            detail: null,
            loadDetail: false,
        };

        const { getByText } = render(
            <ContextApp.Provider value={mockContext as IContextApp}>
                <MemoryRouter>
                    <SelectACharacter />
                    <Details />
                </MemoryRouter>
            </ContextApp.Provider>,
        );

        const selectCharacter = getByText('Выберите персонажа');
        expect(selectCharacter).toBeInTheDocument();
    });
});
