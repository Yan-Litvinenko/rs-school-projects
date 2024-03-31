import { htmlElement } from '../../htmlElement';
import { tableTitle } from './tableTitle';

function winnersTable() {
    const table = htmlElement({
        tag: 'div',
        attributes: {
            class: 'table',
        },
        children: htmlElement({
            tag: 'div',
            attributes: {
                class: 'table__inner',
            },
            children: [tableTitle()],
        }),
    });

    return table;
}

export { winnersTable };
