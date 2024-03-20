import { createElement } from '../tag';
import { dataBase } from '../DataBase';
import { app } from '../app';

import '../app';
import '../DataBase';
import './registration.scss';

function inputClean() {
  const name: HTMLInputElement = document.querySelector('.registration__name')!;
  const surname: HTMLInputElement = document.querySelector('.registration__surname')!;

  name.value = '';
  surname.value = '';
}

function validDataInput(inputName: string, length: number): string | false {
  const inputElement: HTMLInputElement = document.querySelector(`.registration__${inputName}`)!;
  const error: HTMLElement = document.getElementById(`error-${inputName}`)!;
  const data: string = inputElement.value;

  if (data.length < length) {
    error.textContent = `Error, ${inputName} too short`;
    return false;
  } else if (data[0] !== data[0].toUpperCase()) {
    error.textContent = 'Error, the first letter must be capitalized';
    return false;
  } else if (/[^a-zA-Z][^-]/.test(data)) {
    error.textContent = 'Error, surname contains invalid characters';
    return false;
  } else {
    error.textContent = '';
    return data;
  }
}

function validateData(): void {
  const name: string | false = validDataInput('name', 3);
  const surname: string | false = validDataInput('surname', 4);

  if (name && surname) {
    dataBase.add('name', name);
    dataBase.add('surname', surname);
    inputClean();
    app.puzzle();
  }
}

const registration: HTMLElement = createElement(
  'main',
  { class: 'registration' },
  createElement(
    'div',
    { class: 'container' },
    createElement(
      'div',
      { class: 'registration__inner' },
      createElement('h2', { class: ['registration__title', 'title'], textContent: 'Registration' }),
      createElement(
        'form',
        { class: 'registration__form' },
        createElement(
          'div',
          { class: 'registration__form-inner' },
          createElement(
            'label',
            { class: 'registration__label', attributes: { for: 'name' } },
            createElement('span', { class: 'registration__label-text', textContent: 'name:' }),
            createElement('input', {
              class: 'registration__name',
              attributes: { id: 'name', type: 'text', placeholder: 'Enter your name...' },
            }),
            createElement('span', { class: 'registration__error', attributes: { id: 'error-name' } }),
          ),
          createElement(
            'label',
            { class: 'registration__label', attributes: { for: 'surname' } },
            createElement('span', { class: 'registration__label-text', textContent: 'surname:' }),
            createElement('input', {
              class: 'registration__surname',
              attributes: { id: 'surname', type: 'text', placeholder: 'Enter your surname...' },
            }),
            createElement('span', { class: 'registration__error', attributes: { id: 'error-surname' } }),
          ),
          createElement('button', {
            class: 'registration__complete',
            textContent: 'Login',
            attributes: { type: 'button' },
            onclick: () => validateData(),
          }),
        ),
      ),
    ),
  ),
);

export { registration };
