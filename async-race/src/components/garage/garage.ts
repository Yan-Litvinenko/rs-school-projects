import { htmlElement } from '../htmlElement';
import { formCar } from './htmlComonents/createCarForm';
import { pages } from './htmlComonents/pages';
import { panel } from './htmlComonents/controlPanel';
import { garageBody } from './htmlComonents/garageBody';
import { race } from '../race/race';
import { ICar } from '../interfaces/interfaces';
import { car } from '../../car';

class Garage {
    private page: number;

    constructor(page: number = 1) {
        this.page = page;
    }

    async renderGarage(): Promise<HTMLElement> {
        const garageBodyElement: HTMLElement = await garageBody();
        const raceElement: HTMLElement = await race.renderRace();
        const garageElement: HTMLElement = htmlElement({
            tag: 'div',
            attributes: { class: 'garage' },
            children: [pages(), formCar(), panel(), garageBodyElement, raceElement],
        });
        return garageElement;
    }

    getCarsInPage(cars: ICar[]): ICar[] {
        const end: number = this.page * 7;

        return cars.slice(end - 7, end);
    }

    nextPage() {
        const titlePage: Element | null = document.querySelector('.garage__title-page');

        if (car.count / 7 > this.page) {
            this.page++;
            race.updateRaceItems();

            if (titlePage) {
                titlePage.textContent = `page #${this.page}`;
            }
        }
    }

    prevPage() {
        const titlePage: Element | null = document.querySelector('.garage__title-page');

        this.page--;

        if (this.page < 1) {
            this.page = 1;
        }

        if (titlePage) {
            titlePage.textContent = `page #${this.page}`;
        }

        race.updateRaceItems();
    }

    getPage() {
        return this.page;
    }
}

const garage: Garage = new Garage();

export { garage };
