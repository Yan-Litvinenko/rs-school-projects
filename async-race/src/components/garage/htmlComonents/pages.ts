import { htmlElement } from '../../htmlElement';
import { app } from '../../../app';
import '../garage.css';

function pages(): HTMLElement {
    const winners = winnersButton();
    const garage = garageButton();

    winners.addEventListener('click', () => app.winners());
    garage.addEventListener('click', () => app.start());

    return htmlElement({
        tag: 'div',
        attributes: { class: 'page' },
        children: [garage, winners],
    });
}

function garageButton() {
    return htmlElement({
        tag: 'a',
        attributes: {
            class: ['page__garage', 'page__item'],
            textContent: 'to garage',
        },
    });
}

function winnersButton() {
    return htmlElement({
        tag: 'a',
        attributes: {
            class: ['page__winners', 'page__item'],
            textContent: 'to winners',
        },
    });
}

export { pages };
