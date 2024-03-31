import { ICar } from './components/interfaces/interfaces';
import { race } from './components/race/race';

class Car {
    mark: string[];
    count: number;

    constructor() {
        this.mark = [
            'BMW',
            'Volvo',
            'Volkswagen',
            'Toyota',
            'Skoda',
            'Renault',
            'Peugeot',
            'Opel',
            'Nissan',
            'Dodge',
            'Ford',
            'Citroen',
        ];
        this.count = 0;
    }

    getMark() {
        return this.mark;
    }

    async loadCar(): Promise<ICar[]> {
        const response: Response = await fetch('http://localhost:3000/garage');
        const cars: Promise<ICar[]> = await response.json();
        this.count = (await cars).length;

        return cars;
    }

    async updateCountCar(): Promise<number> {
        const cars: ICar[] = await this.loadCar();
        const title: Element | null = document.querySelector('.garage__count-car');

        if (title) {
            title.textContent = `Garage(${cars.length})`;
            race.updateRaceItems();
        }

        return cars.length;
    }

    addNewCar(): void {
        const createButton = document.querySelector('.create__car-button');
        const color = document.getElementById('create-car-color') as HTMLInputElement;
        const name = document.getElementById('create-car-name') as HTMLInputElement;

        createButton?.addEventListener('click', (event) => {
            event.preventDefault();

            const jsonData: Record<string, string> = {};

            jsonData['color'] = color?.value;

            if (!name.value.length) {
                jsonData['name'] = this.mark[this.getRandomvalue(0, this.mark.length - 1)];
            } else {
                jsonData['name'] = name?.value;
            }

            fetch('http://localhost:3000/garage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            }).catch((error) => console.error('При добавлении машины произошла ошибка:', error));

            this.updateCountCar();
            name.value = '';
        });
    }

    getRandomvalue(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

const car = new Car();

export { car, Car };
