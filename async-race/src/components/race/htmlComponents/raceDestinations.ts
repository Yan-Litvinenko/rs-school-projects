import { htmlElement } from '../../htmlElement';
import { race } from '../race';

function raceDestination(): HTMLElement {
    return destinationContainer([startCarElement(), resetCarElement()]);
}

function destinationContainer(children: HTMLElement[]) {
    return htmlElement({
        tag: 'div',
        attributes: {
            class: 'race__destinations',
        },
        children: [...children],
    });
}

function startCarElement(): HTMLElement {
    const start: HTMLElement = htmlElement({
        tag: 'button',
        attributes: {
            class: ['race__A', 'race__destinations-item', 'race__destinations--active'],
            textContent: 'A',
        },
    });

    addEventListenerStart(start);

    return start;
}

function resetCarElement() {
    const reset = htmlElement({
        tag: 'button',
        attributes: {
            class: ['race__B', 'race__destinations-item'],
            textContent: 'B',
        },
    });

    return reset;
}

function addEventListenerStart(btn: HTMLElement) {
    btn.addEventListener(
        'click',
        () => {
            const id = race.getRaceItemId(btn);
            race.raceDestinationsBtnActive(id, 'A');
            race.singleStartRace(id);
        },
        { once: true },
    );
}

export { raceDestination, addEventListenerStart };
