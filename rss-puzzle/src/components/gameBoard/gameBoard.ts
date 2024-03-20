import { createElement } from '../tag';
import { app, puzzleLevel, puzzleLoader, puzzleResponse, puzzleSelect, puzzleSettings } from '../app';
import '../app';
import './gameBoard.css';
import { dataBase } from '../DataBase';

function gameBoard(): HTMLElement {
  const selectLevel = puzzleSelect.createSelect('level', () => puzzleLevel.setLevel(Number(selectLevel.value)));
  const selectPage = puzzleSelect.createSelect('page', () => puzzleLevel.setRound(Number(selectPage.value)));

  return createElement(
    'main',
    { class: 'game' },
    createElement(
      'div',
      { class: 'container' },
      createElement(
        'div',
        { class: 'game__inner' },
        createElement(
          'header',
          { class: 'header' },
          createElement(
            'div',
            { class: 'header__inner' },
            createElement(
              'div',
              { class: 'set-level' },
              createElement(
                'div',
                { class: 'set-level__inner' },
                createElement('span', { class: 'set-level__text', textContent: 'Level' }),
                selectLevel,
                createElement('span', { class: 'set-level__text', textContent: 'Page' }),
                selectPage,
              ),
            ),
            createElement(
              'div',
              { class: 'settings' },
              createElement('div', {
                class: ['settings__translate', 'settings__item'].concat(
                  dataBase.get('translate') === false ? ['settings__deactive'] : [],
                ),
                textContent: '\uD83D\uDCC4',
                onclick: () => puzzleSettings.setTranslate(),
              }),
              createElement('div', {
                class: ['settings__img', 'settings__item'],
                textContent: '\u{1F5BC}',
                onclick: () => puzzleSettings.setBackgroundImage(),
              }),
            ),
            createElement(
              'div',
              {
                class: ['hint-sentence'].concat(dataBase.get('translate') === false ? ['hint-sentence--deactive'] : []),
              },
              createElement('div', {
                class: ['translate-sentence'],
                textContent: `${puzzleLoader.collection.rounds[puzzleLevel.getRound()].words[puzzleLevel.getRow()].textExampleTranslate}`,
              }),
              createElement('div', {
                class: 'audio-sentence',
                textContent: '\u{1F508}',
                onclick: () => {
                  puzzleResponse.audioHint();
                },
              }),
            ),
          ),
        ),
        createElement('div', { class: 'puzzle' }, createElement('div', { class: 'puzzle__inner' })),
        createElement('div', { class: 'sentence' }),
        createElement(
          'div',
          { class: 'control-level' },
          createElement('button', {
            class: ['control-level__btn', 'control-level__btn--deactive'],
            textContent: 'Check',
            attributes: {
              type: 'button',
              id: 'check-continue',
            },
            onclick: () => false,
          }),
          createElement('button', {
            class: 'control-level__btn',
            textContent: 'Autocomplete',
            attributes: {
              type: 'button',
              id: 'autocomplete',
            },
            onclick: () => puzzleResponse.autocomplete(),
          }),
          createElement('button', {
            class: 'control-level__btn',
            textContent: 'Logout',
            attributes: { type: 'button', id: 'logout' },
            onclick: () => app.logout(),
          }),
        ),
      ),
    ),
  );
}

export { gameBoard };
