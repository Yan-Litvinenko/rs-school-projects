import { htmlElement } from '../../htmlElement';
import { createCarRow } from './createCarRow';
import { updateCarRow } from './updateCarRow';

function formCar(): HTMLElement {
    return htmlElement({
        tag: 'form',
        attributes: {
            class: 'create-car',
            id: 'car-form',
        },
        children: htmlElement({
            tag: 'div',
            attributes: {
                class: 'form__inner',
            },
            children: [createCarRow(), updateCarRow()],
        }),
    });
}

export { formCar };
