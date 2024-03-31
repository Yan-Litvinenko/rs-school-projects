import { htmlElement } from '../../htmlElement';
import { raceCarImage } from './raceCarImage';
import { raceCarTitle } from './raceCarTitile';
import { raceDestination } from './raceDestinations';
import { raceItemStart } from './raceItemStart';
import { raceFinish } from './raceFinish';

function createRaceItem(name: string, color: string, id: number): HTMLElement {
    const item = htmlElement({
        tag: 'div',
        attributes: {
            class: 'race__item',
        },
        children: [raceItemStart(), raceDestination(), raceCarTitle(name), raceFinish()],
    });

    item.setAttribute('data-id', `${id}`);
    item.append(raceCarImage(color));

    return item;
}

raceCarImage('');

export { createRaceItem };
