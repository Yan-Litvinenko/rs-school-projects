import { car } from '../../../car';
import { htmlElement } from '../../htmlElement';
import { ICar } from '../../interfaces/interfaces';
import { race } from '../race';

function raceCarEdit(): HTMLElement {
    const removeBtn = htmlElement({
        tag: 'button',
        attributes: {
            class: 'race__delete-car',
            textContent: 'remove',
        },
    });

    const selectBtn = htmlElement({
        tag: 'button',
        attributes: {
            class: 'race__select-car',
            textContent: 'select',
        },
    });

    addEventListenerRemove(removeBtn);
    addEventListenerSelect(selectBtn);

    return raceEditElement([selectBtn, removeBtn]);
}

function raceEditElement(children: HTMLElement[] | HTMLElement): HTMLElement {
    return htmlElement({
        tag: 'div',
        attributes: {
            class: 'race__edit',
        },
        children: children,
    });
}

function addEventListenerRemove(btn: HTMLElement): void {
    btn.addEventListener('click', (event) => {
        const id: string | null | undefined = (event.target as HTMLElement)
            .closest('.race__item')
            ?.getAttribute('data-id');

        fetch(`http://localhost:3000/garage/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                console.log('Машина удалена из гонки');
                race.updateRaceItems();
                car.updateCountCar();
            })
            .catch((error) => console.log(`Ошибка удаления: ${error}`));
    });
}

async function addEventListenerSelect(btn: HTMLElement): Promise<void> {
    btn.addEventListener('click', async () => {
        const [nameInput, colorInput, updateButton] = Array.from(
            document.querySelectorAll('.update__car-name, .update__car-color, .update__car-button'),
        ) as [HTMLInputElement, HTMLInputElement, HTMLElement];
        const id: string | null | undefined = btn.closest('.race__item')?.getAttribute('data-id');

        try {
            const response: Response = await fetch(`http://localhost:3000/garage/${id}`);
            const car: ICar = await response.json();
            let color: string = car.color;

            if (car.color.match('rgb')) {
                color = rgbToHexColor(...(car.color.match(/\d+/g)?.map(Number) || []));
            }

            nameInput.value = car.name;
            colorInput.value = `${color}`;
            updateButton?.setAttribute('id', `${id}`);
        } catch (error) {
            console.log(`Ошибка: ${error}`);
        }
    });
}

function rgbToHexColor(...n: number[]): string {
    return '#' + convertToHex(n[0]) + convertToHex(n[1]) + convertToHex(n[2]);
}

function convertToHex(n: number): string {
    return n.toString(16).padStart(2, '0');
}

export { raceCarEdit };
