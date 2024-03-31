import { htmlElement } from '../../htmlElement';

function tableWins(wins: number) {
    return htmlElement({
        tag: 'div',
        attributes: {
            class: 'table__wins',
            textContent: `${wins}`,
        },
    });
}

export { tableWins };
