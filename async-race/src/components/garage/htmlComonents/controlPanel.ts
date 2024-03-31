import { htmlElement } from '../../htmlElement';
import { race } from '../../race/race';
import { car } from '../../../car';

function panel(): HTMLElement {
    const generateBtn: HTMLElement = generateBtnElement();
    const raceBtn: HTMLElement = raceBtnElement();
    const reset: HTMLElement = resetBtnElement();

    addEventListenerGenerate(generateBtn);
    addEventListenerRace(raceBtn);
    reset.addEventListener('click', () => race.resetRace());

    return htmlElement({
        tag: 'div',
        attributes: {
            class: 'panel',
        },
        children: [raceBtn, reset, generateBtn],
    });
}

function addEventListenerGenerate(btn: HTMLElement): void {
    btn.addEventListener('click', () => {
        for (let i = 0; i < 100; i++) {
            const carData: Record<string, string> = {};

            carData.name = car.mark[car.getRandomvalue(0, car.mark.length - 1)];
            carData.color = `rgb(${car.getRandomvalue(0, 255)},${car.getRandomvalue(0, 255)},${car.getRandomvalue(0, 255)})`;

            fetch('http://localhost:3000/garage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(carData),
            }).catch((error) => console.error('При добавлении машины произошла ошибка:', error));
        }
        car.updateCountCar();
    });
}

function addEventListenerRace(btn: HTMLElement): void {
    btn.addEventListener('click', async () => race.racingRace(), { once: true });
}

function generateBtnElement(): HTMLElement {
    return htmlElement({
        tag: 'button',
        attributes: {
            class: 'panel__generate',
            textContent: 'generate',
            type: 'button',
        },
    });
}

function raceBtnElement(): HTMLElement {
    return htmlElement({
        tag: 'button',
        attributes: {
            class: 'panel__race',
            textContent: 'race',
            type: 'button',
        },
    });
}

function resetBtnElement(): HTMLElement {
    return htmlElement({
        tag: 'button',
        attributes: {
            class: 'panel__reset',
            textContent: 'reset',
            type: 'button',
        },
    });
}

export { panel, addEventListenerRace };
