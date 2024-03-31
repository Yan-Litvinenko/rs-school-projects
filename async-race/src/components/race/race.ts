import { car } from '../../car';
import { htmlElement } from '../htmlElement';
import { createRaceItem } from './htmlComponents/raceItem';
import { ICar, IEngineData, IRace } from '../interfaces/interfaces';
import { garagePagination } from '../garage/htmlComonents/garagePagination';
import { garage } from '../garage/garage';
import { addEventListenerStart } from './htmlComponents/raceDestinations';
import './race.css';
import { winners } from '../winners/winners';
import { addEventListenerRace } from '../garage/htmlComonents/controlPanel';

class Race {
    private animationState: Record<string, boolean> = {};
    private animationTimers: Record<string, NodeJS.Timeout> = {};
    private race: IRace;

    constructor() {
        this.race = {
            status: false,
            carCount: 0,
            carCountInRace: 0,
            winner: null,
        };
    }

    async renderRace(): Promise<HTMLElement> {
        const carsLoad: ICar[] = await car.loadCar();
        const cars: ICar[] = garage.getCarsInPage(carsLoad);

        const children: HTMLElement[] = cars.map((carItem: ICar) =>
            createRaceItem(carItem.name, carItem.color, carItem.id),
        );

        return htmlElement({
            tag: 'div',
            attributes: { class: 'race' },
            children: htmlElement({
                tag: 'div',
                attributes: { class: 'race__inner' },
                children: [...children, garagePagination()],
            }),
        });
    }

    async updateRaceItems(): Promise<void> {
        const raceElement = document.querySelector('.race');
        const garageBody = document.querySelector('.garage__body');

        if (raceElement) {
            const updateRace = await this.renderRace();
            raceElement.remove();
            garageBody?.insertAdjacentElement('afterend', updateRace);
        }
    }

    async singleStartRace(id: string): Promise<void> {
        try {
            await this.singleStartRequest(id);
        } catch (error) {
            console.log(`Failed to start car ${id}`, error);
        }
    }

    async singleStartRequest(id: string): Promise<void> {
        const resetBtn = document.querySelector(`[data-id="${id}"] .race__B`)!;
        const startBtn = document.querySelector(`[data-id="${id}"] .race__A`) as HTMLElement;
        const startedResponse = await fetch(
            `http://localhost:3000/engine?id=${id}&status=started`,
            { method: 'PATCH' },
        );
        const data: IEngineData = await startedResponse.json();

        resetBtn.addEventListener('click', () => {
            addEventListenerStart(startBtn);
            this.singleResetRace(id), { once: true };
        });

        if (startedResponse.ok) {
            if (!this.animationState[id]) {
                this.createAnimation(id, data.velocity);
            }
            this.singleStartEngine(id);
        } else {
            console.log(`Failed to start car ${id}`, data);
        }
    }

    async singleStartEngine(id: string): Promise<void> {
        const engineResponse = await fetch(`http://localhost:3000/engine?id=${id}&status=drive`, {
            method: 'PATCH',
        });

        if (!engineResponse.ok) {
            if (engineResponse.status === 500) {
                clearInterval(this.animationTimers[id]);
                delete this.animationTimers[id];
                console.log(`Engine of car ${id} failed`);
            } else if (engineResponse.status === 429) {
                console.log(`Wait for car ${id} to finish race`);
            }
        }
    }

    async singleRaceEnd(id: string, startTime: number): Promise<void> {
        try {
            await fetch(`http://localhost:3000/engine?id=${id}&status=stopped`, {
                method: 'PATCH',
            });

            if (this.race.status) {
                if (!this.race.winner) {
                    const finishTimer = new Date().getTime();

                    this.race.winner = Number(id);
                    winners.addWinner(id, (finishTimer - startTime) / 1000);
                }
                this.race.carCount++;
            }

            this.checkRaceEnd();
        } catch (error) {
            this.race.carCount++;
            this.checkRaceEnd();

            console.log(`Car ${id} did not finish the race`, error);
        }
    }

    async singleResetRace(id: string): Promise<void> {
        const carElement = document.querySelector(`[data-id="${id}"] .race__img`) as HTMLElement;
        const btnStart = document.querySelector(`[data-id="${id}"] .race__A`) as HTMLElement;

        carElement.style.left = '0%';
        clearInterval(this.animationTimers[id]);
        this.animationState[id] = false;
        this.raceDestinationsBtnActive(id, 'B');
        await fetch(`http://localhost:3000/engine?id=${id}&status=stopped`, { method: 'PATCH' });

        btnStart.addEventListener('click', () => this.singleStartRace(id), { once: true });

        console.log('Car finished the race');
    }

    private createAnimation(id: string, velocity: number): void {
        const carElement = document.querySelector(`[data-id="${id}"] .race__img`) as HTMLElement;
        let current = 0;

        const interval = velocity / 4;
        const startTime = new Date().getTime();
        const animation = setInterval(() => {
            current += 0.1;
            carElement.style.left = `${current}%`;

            if (current > 85) {
                clearInterval(animation);
                this.animationState[id] = false;
                this.singleRaceEnd(id, startTime);
            }
        }, interval);

        this.animationTimers[id] = animation;
    }

    getRaceItemId(btn: HTMLElement): string {
        const raceElement = btn.closest('.race__item');
        if (!raceElement) {
            throw new Error('Parent race item element not found');
        }

        const dataId = raceElement.getAttribute('data-id');
        if (!dataId) {
            throw new Error('Data attribute "data-id" not found');
        }

        return dataId;
    }

    racingRace() {
        const cars = Array.from(document.querySelectorAll('.race__item')).map((item) =>
            item.getAttribute('data-id'),
        );

        this.race.status = true;
        this.race.carCountInRace = cars.length;

        cars.forEach((item) => {
            this.raceDestinationsBtnActive(item!, 'A');
            if (item) this.singleStartRace(item);
        });
    }

    raceDestinationsBtnActive(id: string, flag: 'A' | 'B') {
        const btnA = document.querySelector(`[data-id="${id}"] .race__A`);
        const btnB = document.querySelector(`[data-id="${id}"] .race__B`);

        if (flag === 'A') {
            btnA?.classList.remove('race__destinations--active');
            btnB?.classList.add('race__destinations--active');
        } else {
            btnA?.classList.add('race__destinations--active');
            btnB?.classList.remove('race__destinations--active');
        }
    }

    checkRaceEnd() {
        if (this.race.carCount === this.race.carCountInRace) {
            addEventListenerRace(document.querySelector('.panel__race')!);
            this.race.carCount = 0;
            this.race.carCountInRace = 0;
            this.race.status = false;
            this.race.winner = null;
        }
    }

    resetRace() {
        const cars = Array.from(document.querySelectorAll('.race__item')).map((item) =>
            item.getAttribute('data-id'),
        );

        cars.forEach((item) => {
            if (item) this.singleResetRace(item);
        });
    }
}

const race = new Race();

export { race };
