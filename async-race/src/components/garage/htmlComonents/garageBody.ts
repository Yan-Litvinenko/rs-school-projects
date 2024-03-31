import { htmlElement } from '../../htmlElement';
import { car } from '../../../car';
import { garage } from '../garage';

async function garageBody(): Promise<HTMLElement> {
    const count: number = await car.updateCountCar();

    return htmlElement({
        tag: 'div',
        attributes: {
            class: 'garage__body',
        },
        children: [
            htmlElement({
                tag: 'h1',
                attributes: {
                    class: ['garage__title', 'garage__count-car'],
                    textContent: `Garage(${count})`,
                },
            }),
            htmlElement({
                tag: 'h2',
                attributes: {
                    class: ['garage__title', 'garage__title-page'],
                    textContent: `page #${garage.getPage()}`,
                },
            }),
        ],
    });
}

export { garageBody };
