import { createElement } from '../tag';
import { app } from '../app';
import { dataBase } from '../DataBase';

import '../app';
import '../DataBase';
import './home.scss';

function getRegisterSection() {
  if (!dataBase.get('name') || !dataBase.get('surname')) {
    app.registration();
  } else {
    app.puzzle();
  }
}

let home: HTMLElement;

home = createElement(
  'main',
  { class: 'home' },
  createElement(
    'div',
    { class: 'container' },
    createElement(
      'div',
      { class: 'home__inner' },
      createElement('h1', { class: ['home__title', 'title'], textContent: 'english puzzle' }),
      createElement('p', { class: 'home__description', textContent: 'Click on words, collect phrases.' }),
      createElement('p', {
        class: 'home__description',
        textContent: 'Words can be drag and drop. Select tooltips in the menu',
      }),
      createElement('button', {
        class: 'home__btn',
        attributes: { type: 'button' },
        textContent: 'Start',
        onclick: () => getRegisterSection(),
      }),
    ),
  ),
  createElement(
    'div',
    { class: dataBase.get('name') && dataBase.get('surname') ? 'greeting' : 'greeting__deactive' },
    createElement(
      'div',
      { class: 'greeting__inner' },
      createElement('p', {
        class: 'greeting__name',
        textContent: `Hello, ${dataBase.get('name')} ${dataBase.get('surname')}!`,
      }),
    ),
  ),
);

export { home };
