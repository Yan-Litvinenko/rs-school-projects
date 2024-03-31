import { IHtmlElement } from './interfaces/interfaces';

function htmlElement(props: IHtmlElement | Record<string, string>): HTMLElement {
    const element = document.createElement(props.tag);

    if (props.attributes) {
        Object.entries(props.attributes).forEach(([nameAttribute, valueAttribute]) => {
            if (nameAttribute === 'textContent') {
                if (!Array.isArray(valueAttribute)) {
                    element.textContent = valueAttribute;
                }
            } else if (Array.isArray(valueAttribute)) {
                element.setAttribute(nameAttribute, valueAttribute.join(' '));
            } else {
                element.setAttribute(nameAttribute, valueAttribute);
            }
        });
    }

    if (props.children) {
        if (Array.isArray(props.children)) {
            element.append(...props.children);
        } else {
            element.append(props.children);
        }
    }

    return element;
}

export { htmlElement };
