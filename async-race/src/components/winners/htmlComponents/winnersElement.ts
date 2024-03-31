import { htmlElement } from '../../htmlElement';
import { pages } from '../../garage/htmlComonents/pages';
import { winnersTable } from './winnersTable';
import { winners } from '../winners';

async function winnersElement() {
    return htmlElement({
        tag: 'div',
        attributes: {
            class: 'winners',
        },
        children: htmlElement({
            tag: 'div',
            attributes: {
                class: 'winners__inner',
            },
            children: [pages(), await winnersTitle(), winnersTable()],
        }),
    });
}

async function winnersTitle() {
    const count = await winners.getCountWinners();

    return htmlElement({
        tag: 'h2',
        attributes: {
            class: 'winners__title',
            textContent: `winners (${count})`,
        },
    });
}

export { winnersElement };
