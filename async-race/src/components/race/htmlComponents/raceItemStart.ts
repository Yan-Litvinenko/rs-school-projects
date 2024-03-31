import { htmlElement } from '../../htmlElement';
import { raceCarEdit } from './raceCarEdit';

function raceItemStart(): HTMLElement {
    return htmlElement({
        tag: 'div',
        attributes: {
            class: 'race__start',
        },
        children: raceCarEdit(),
    });
}

export { raceItemStart };
