import { htmlElement } from '../../htmlElement';

function tableName(name: string) {
    return htmlElement({
        tag: 'div',
        attributes: {
            class: 'table__name',
            textContent: name,
        },
    });
}

export { tableName };
