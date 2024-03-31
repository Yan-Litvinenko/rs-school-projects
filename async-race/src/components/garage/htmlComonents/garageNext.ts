import { garage } from '../garage';
import { htmlElement } from '../../htmlElement';

function raceNext(): HTMLElement {
    const btn: HTMLElement = htmlElement({
        tag: 'button',
        attributes: {
            class: 'race__pagination-btn',
            id: 'next',
            type: 'button',
            textContent: 'Next',
        },
    });

    btn.addEventListener('click', () => garage.nextPage());

    return btn;
}

export { raceNext };
