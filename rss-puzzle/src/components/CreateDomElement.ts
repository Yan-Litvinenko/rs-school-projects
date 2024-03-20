import { DomElementOptions } from '../interfaces/interfaces';

class DOMElementCreator {
  private node: HTMLElement;

  private options: DomElementOptions;

  constructor(tagName: string, options: DomElementOptions, ...children: HTMLElement[]) {
    this.options = options;
    this.node = document.createElement(tagName);
    this.setAttributes();

    if (children.length) {
      this.node.append(...children);
    }
  }

  setAttributes(): void {
    if (this.options.attributes) {
      Object.entries(this.options.attributes).forEach(([key, item]) => this.node.setAttribute(key, item));
    }

    if (this.options.textContent) {
      this.node.textContent = this.options.textContent;
    }

    if (Array.isArray(this.options.class)) {
      this.node.classList.add(...this.options.class);
    } else {
      this.node.classList.add(this.options.class);
    }

    if (this.options.onclick) {
      this.node.onclick = this.options.onclick;
    }
  }

  appendChild(child: HTMLElement): void {
    this.node.append(child);
  }

  getNode(): HTMLElement {
    return this.node;
  }
}

export { DOMElementCreator };
