import { car } from '../../../car';
import { htmlElement } from '../../htmlElement';

function createCarRow(): HTMLElement {
    const createButton: HTMLElement = htmlElement({
        tag: 'button',
        attributes: {
            class: 'create__car-button',
            type: 'submit',
            textContent: 'create',
        },
    });

    const inputName: HTMLElement = htmlElement({
        tag: 'input',
        attributes: {
            class: 'create__car-name',
            id: 'create-car-name',
            type: 'text',
            name: 'name',
        },
    });

    const inputColor: HTMLElement = htmlElement({
        tag: 'input',
        attributes: {
            class: 'create__car-color',
            id: 'create-car-color',
            type: 'color',
            value: '#ffffff',
        },
    });

    addEventListener(createButton, inputName, inputColor);

    return htmlElement({
        tag: 'div',
        attributes: {
            class: 'create',
        },
        children: [inputName, inputColor, createButton],
    });
}

function addEventListener(
    createBtn: HTMLElement,
    nameInput: HTMLElement,
    colorInput: HTMLElement,
): void {
    createBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const newCarData: Record<string, string> = {};
        const name = nameInput as HTMLInputElement;
        const marks: string[] = car.getMark();

        newCarData['color'] = (colorInput as HTMLInputElement).value;

        if (!name.value.length) {
            newCarData['name'] = marks[car.getRandomvalue(0, marks.length - 1)];
        } else {
            newCarData['name'] = name?.value;
        }

        fetch('http://localhost:3000/garage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCarData),
        }).catch((error) => console.error('При добавлении машины произошла ошибка:', error));

        car.updateCountCar();
        name.value = '';
    });
}

export { createCarRow };
