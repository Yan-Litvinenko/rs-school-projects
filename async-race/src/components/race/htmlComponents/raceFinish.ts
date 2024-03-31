import { htmlElement } from '../../htmlElement';
import flag from '../../../assets/images/flag.svg';

function raceFinish(): HTMLElement {
    return htmlElement({
        tag: 'img',
        attributes: {
            class: 'race__finish',
            src: flag,
            alt: 'flag',
        },
    });
}

export { raceFinish };
