import { htmlElement } from '../../htmlElement';

function tableTime(time: number) {
    return htmlElement({
        tag: 'div',
        attributes: {
            class: 'table__time',
            textContent: `${time}`,
        },
    });
}

export { tableTime };
