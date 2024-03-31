import { htmlElement } from '../../htmlElement';

function tableitem(...children: HTMLElement[]) {
    return htmlElement({
        tag: 'div',
        attributes: {
            class: 'table__item',
        },
        children: [...children],
    });
}

export { tableitem };
