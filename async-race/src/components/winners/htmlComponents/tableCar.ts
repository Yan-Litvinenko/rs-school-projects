import { htmlElement } from '../../htmlElement';
import { raceCarImage } from '../../race/htmlComponents/raceCarImage';

function tableCar(color: string) {
    return htmlElement({
        tag: 'div',
        attributes: {
            class: 'table__car',
        },
        children: [raceCarImage(color, 'table__car-img')],
    });
}

export { tableCar };
