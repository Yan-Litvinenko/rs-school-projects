import { htmlElement } from '../../htmlElement';
import { race } from '../../race/race';

function updateCarRow(): HTMLElement {
    const updateBtn: HTMLElement = htmlElement({
        tag: 'button',
        attributes: {
            class: 'update__car-button',
            type: 'submit',
            car: '',
            textContent: 'update',
        },
    });

    addEventListenerUpdate(updateBtn);
    return updateContainer(updateBtn);
}

function updateContainer(child: HTMLElement): HTMLElement {
    return htmlElement({
        tag: 'div',
        attributes: {
            class: 'update',
        },
        children: [
            htmlElement({
                tag: 'input',
                attributes: {
                    class: 'update__car-name',
                    type: 'text',
                },
            }),
            htmlElement({
                tag: 'input',
                attributes: {
                    class: 'update__car-color',
                    type: 'color',
                    value: '#ffffff',
                },
            }),
            child,
        ],
    });
}

function addEventListenerUpdate(btn: HTMLElement): void {
    btn.addEventListener('click', (event) => {
        event?.preventDefault();

        const id: string | null = btn.getAttribute('id');
        const color: string = (document.querySelector('.update__car-color') as HTMLInputElement)
            .value;
        const name: string = (document.querySelector('.update__car-name') as HTMLInputElement)
            .value;

        if (id) {
            fetch(`http://localhost:3000/garage/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    color: color,
                    name: name,
                }),
            })
                .then(() => {
                    race.updateRaceItems();
                    btn.removeAttribute('id');
                    console.log('Данные машины успешно обновлены');
                })
                .catch(() => console.log('При обновлении данных произошла ошибка'));
        } else {
            return;
        }
    });
}

export { updateCarRow };
