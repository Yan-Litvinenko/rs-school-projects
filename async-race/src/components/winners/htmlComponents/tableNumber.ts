import { htmlElement } from '../../htmlElement';

function tableNumber(number: number) {
    return htmlElement({
        tag: 'div',
        attributes: {
            class: 'table__number',
            textContent: `${number}`,
        },
    });
}

export { tableNumber };
