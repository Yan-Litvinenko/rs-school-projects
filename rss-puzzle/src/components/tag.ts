import { DOMElementCreator } from './CreateDomElement';
import { DomElementOptions } from '../interfaces/interfaces';

const createElement = (tagName: string, attributes: DomElementOptions, ...children: HTMLElement[]) => {
  return new DOMElementCreator(tagName, attributes, ...children).getNode();
};

export { createElement };
