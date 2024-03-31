import { htmlElement } from '../../htmlElement';

function tableTitle() {
    return htmlElement({
        tag: 'div',
        attributes: {
            class: 'table__title',
        },
        children: [titleNumber(), titleCar(), titleName(), titleWins(), titleBestTime()],
    });
}

function titleNumber() {
    return htmlElement({
        tag: 'div',
        attributes: {
            class: ['table__title-item', 'table__title-number'],
            textContent: 'number',
        },
    });
}

function titleCar() {
    return htmlElement({
        tag: 'div',
        attributes: {
            class: ['table__title-item', 'table__title-car'],
            textContent: 'Car',
        },
    });
}

function titleName() {
    return htmlElement({
        tag: 'div',
        attributes: {
            class: ['table__title-item', 'table__title-name'],
            textContent: 'name',
        },
    });
}

function titleWins() {
    return htmlElement({
        tag: 'div',
        attributes: {
            class: ['table__title-item', 'table__title-wins'],
            textContent: 'wins',
        },
    });
}

function titleBestTime() {
    return htmlElement({
        tag: 'div',
        attributes: {
            class: ['table__title-item', 'table__title-best'],
            textContent: 'best time',
        },
    });
}

export { tableTitle };
