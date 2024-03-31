import { htmlElement } from '../../htmlElement';
import { raceNext } from './garageNext';
import { racePrev } from './garagePrev';

function garagePagination(): HTMLElement {
    return htmlElement({
        tag: 'div',
        attributes: {
            class: 'race__pagination',
        },
        children: [racePrev(), raceNext()],
    });
}

export { garagePagination };
