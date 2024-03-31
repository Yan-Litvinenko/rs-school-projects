import { htmlElement } from '../../htmlElement';

function raceCarTitle(name: string): HTMLElement {
    return htmlElement({
        tag: 'h3',
        attributes: {
            class: 'race__car-name',
            textContent: `${name}`,
        },
    });
}

export { raceCarTitle };
