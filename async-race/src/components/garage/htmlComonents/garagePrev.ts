import { garage } from '../garage';
import { htmlElement } from '../../htmlElement';

function racePrev(): HTMLElement {
    const btn: HTMLElement = htmlElement({
        tag: 'button',
        attributes: {
            class: 'race__pagination-btn',
            id: 'prev',
            type: 'button',
            textContent: 'Prev',
        },
    });

    btn.addEventListener('click', () => garage.prevPage());

    return btn;
}

export { racePrev };
