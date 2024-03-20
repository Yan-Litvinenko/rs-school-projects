'use strict';

import IMAGES from '../images.json' assert { type: 'json' };
import CSS from './css.js';
import FLAGS from './flags.js';
import SOUNDS from './sounds.js';
import { LEVELS, REVERSELEVELS } from './levels.js';
import localStorageKeys from './localStorageKeys.js';
import Nonogram from './Nonogram.js';
import Timer from './Timer.js';

const GAME = new Nonogram(IMAGES, 0, 5);

createBoard();
createHelpers(GAME.matrix, 'x');
createHelpers(GAME.matrix, 'y');
createCells();

const ELEMENTS = {
    time: document.querySelector('.timer'),
    menu: document.querySelector('.menu'),
    menuInners: document.querySelectorAll('.menu__inner'),
    menuInnerSetting: document.querySelector('.settings'),
    menuInnerSelect: document.querySelector('.select'),
    menuInnerResults: document.querySelector('.results'),
    menuButtons: document.querySelectorAll('.menu__item-btn'),
    menuButton: document.querySelector('.control-panel__btn--menu'),
    modalButton: document.querySelector('.modal__button'),
    solutionButton: document.getElementById('solution'),
    continueButton: document.getElementById('continue-last-game'),
    resetButton: document.getElementById('reset-game'),
    randomGameButton: document.getElementById('random-game'),
    saveButton: document.getElementById('save-game'),
    newGameButton: document.getElementById('new-game'),
    resultsButton: document.getElementById('latest-results'),
    selectButton: document.getElementById('select-image'),
    settingsButton: document.getElementById('settings'),
    settingsInput: document.querySelectorAll('.settings__input'),
    resultTimeSpan: document.querySelector('.modal__text span'),
    switchTheme: document.querySelector('.switch__input'),
    antiAbuse: document.querySelector('.anti-abuse'),
    select: document.querySelector('.settings__select'), // выбор уровня в настройках
    selectList: document.querySelector('.select__list'), // Список изображений для выбора
    resultList: document.querySelector('.results__list'),
    modal: document.querySelector('.modal'),
    image: document.querySelector('.image'),
    size: document.querySelector('.nonograms__size'),
};

const TIMER = new Timer(ELEMENTS.time, ELEMENTS.resultTimeSpan);

addEventListeners();
getColorSettings();
getSettingsSound();

function createAndAppend(parent, options) {
    const element = document.createElement(options.tagName);

    if (options.attributes) {
        for (const [attrName, attrValue] of Object.entries(
            options.attributes,
        )) {
            element.setAttribute(attrName, attrValue);
        }
    }

    if (options.classNames) {
        if (Array.isArray(options.classNames)) {
            element.classList.add(...options.classNames);
        } else {
            element.classList.add(options.classNames);
        }
    }

    if (options.textContent) element.textContent = options.textContent;

    parent.appendChild(element);
    return element;
}

function createBoard() {
    const size = GAME.size;
    const nonogramsContainer = createAndAppend(document.body, {
        tagName: 'div',
        classNames: 'nonograms',
    });
    const nonogramsInner = createAndAppend(nonogramsContainer, {
        tagName: 'div',
        classNames: 'nonograms__inner',
    });
    const controlPanel = createAndAppend(nonogramsContainer, {
        tagName: 'div',
        classNames: 'control-panel',
    });
    const menuButton = createAndAppend(controlPanel, {
        tagName: 'button',
        classNames: ['control-panel__btn', 'control-panel__btn--menu'],
        textContent: 'Menu',
    });
    const timer = createAndAppend(controlPanel, {
        tagName: 'div',
        classNames: 'timer',
        textContent: '00:00',
    });
    const solution = createAndAppend(controlPanel, {
        tagName: 'button',
        classNames: 'control-panel__btn',
        textContent: 'Solution',
        attributes: { id: 'solution' },
    });
    const sizeInfo = createAndAppend(nonogramsInner, {
        tagName: 'div',
        classNames: 'nonograms__size',
        textContent: `${size} x ${size}`,
    });
    const helperY = createAndAppend(nonogramsInner, {
        tagName: 'div',
        classNames: 'helper-y',
    });
    const helperX = createAndAppend(nonogramsInner, {
        tagName: 'div',
        classNames: 'helper-x',
    });
    const image = createAndAppend(nonogramsInner, {
        tagName: 'div',
        classNames: 'image',
    });

    const menuContainer = createAndAppend(document.body, {
        tagName: 'div',
        classNames: 'menu',
    });
    const menuInnerMain = createAndAppend(menuContainer, {
        tagName: 'div',
        classNames: ['menu__inner', 'menu__inner--main'],
    });
    const menuTitleMain = createAndAppend(menuInnerMain, {
        tagName: 'h2',
        classNames: 'menu__title',
        textContent: 'Menu',
    });
    const menuListMain = createAndAppend(menuInnerMain, {
        tagName: 'ul',
        classNames: 'menu__list',
    });

    const menuInnerSettings = createAndAppend(menuContainer, {
        tagName: 'div',
        classNames: [
            'menu__inner',
            'settings',
            'menu__inner--settings',
            'deactive-element',
        ],
    });
    const menuTitleSettings = createAndAppend(menuInnerSettings, {
        tagName: 'h2',
        classNames: 'menu__title',
        textContent: 'Settings',
    });
    const settingList = createAndAppend(menuInnerSettings, {
        tagName: 'ul',
        classNames: 'settings__list',
    });
    const settingItems = ['Square sound', 'Cross sound', 'Win sound'];
    settingItems.forEach((x) => {
        const settingItem = createAndAppend(settingList, {
            tagName: 'li',
            classNames: 'settings__item',
        });
        createAndAppend(settingItem, {
            tagName: 'label',
            classNames: 'settings__name',
            textContent: x,
            attributes: { for: x.toLowerCase().replace(/\s+/g, '-') },
        });
        createAndAppend(settingItem, {
            tagName: 'input',
            classNames: 'settings__input',
            attributes: {
                type: 'checkbox',
                checked: true,
                id: x.toLowerCase().replace(/\s+/g, '-'),
            },
        });
    });

    const menuInnerLatestResults = createAndAppend(menuContainer, {
        tagName: 'div',
        classNames: [
            'menu__inner',
            'results',
            'menu__inner--results',
            'deactive-element',
        ],
    });
    const menuTitleResults = createAndAppend(menuInnerLatestResults, {
        tagName: 'h2',
        classNames: 'menu__title',
        textContent: 'Latest Results',
    });
    const menuListResults = createAndAppend(menuInnerLatestResults, {
        tagName: 'ul',
        classNames: 'results__list',
    });

    const settingSwitchItem = createAndAppend(settingList, {
        tagName: 'li',
        classNames: 'settings__item',
    });
    const switchText = createAndAppend(settingSwitchItem, {
        tagName: 'label',
        classNames: 'settings__name',
        textContent: 'Theme',
        attributes: { for: 'switch' },
    });
    const switchLabel = createAndAppend(settingSwitchItem, {
        tagName: 'div',
        classNames: 'switch',
    });
    const switchInput = createAndAppend(switchLabel, {
        tagName: 'input',
        classNames: 'switch__input',
        attributes: { id: 'switch', type: 'checkbox' },
    });
    const switchSlider = createAndAppend(switchLabel, {
        tagName: 'span',
        classNames: 'switch__slider',
    });

    const settingItemLevel = createAndAppend(settingList, {
        tagName: 'li',
        classNames: 'settings__item',
    });
    const selectLevelText = createAndAppend(settingItemLevel, {
        tagName: 'span',
        textContent: 'Level',
    });
    const selectLevel = createAndAppend(settingItemLevel, {
        tagName: 'select',
        classNames: 'settings__select',
    });
    const levels = ['easy', 'medium', 'hard'];
    levels.forEach((x) =>
        createAndAppend(selectLevel, {
            tagName: 'option',
            textContent: x[0].toUpperCase() + x.slice(1),
            attributes: { value: x },
        }),
    );

    const menuItems = [
        'New Game',
        'Save Game',
        'Reset Game',
        'Random Game',
        'Continue Last Game',
        'Select Image',
        'Latest Results',
        'Settings',
    ];
    menuItems.forEach((itemText) => {
        const menuItem = createAndAppend(menuListMain, {
            tagName: 'li',
            classNames: 'menu__item',
        });
        const menuItemButton = createAndAppend(menuItem, {
            tagName: 'button',
            classNames: 'menu__item-btn',
            textContent: itemText,
            attributes: { id: itemText.toLowerCase().replace(/\s+/g, '-') },
        });
    });

    const menuInnerSelect = createAndAppend(menuContainer, {
        tagName: 'div',
        classNames: [
            'menu__inner',
            'select',
            'menu__inner--select',
            'deactive-element',
        ],
    });
    const menuTitleSelect = createAndAppend(menuInnerSelect, {
        tagName: 'h2',
        classNames: 'menu__title',
        textContent: 'Select Image',
    });
    const menuListSelect = createAndAppend(menuInnerSelect, {
        tagName: 'ul',
        classNames: 'select__list',
    });

    const modalContainer = createAndAppend(document.body, {
        tagName: 'div',
        classNames: 'modal',
    });
    const modalInner = createAndAppend(modalContainer, {
        tagName: 'div',
        classNames: 'modal__inner',
    });
    modalInner.insertAdjacentHTML(
        'beforeend',
        '<p class="modal__text">Great! You have solved the nonogram, in <span>0</span>!</p>',
    );
    createAndAppend(modalInner, {
        tagName: 'button',
        classNames: 'modal__button',
        textContent: 'Next game',
    });

    const antiAbuse = createAndAppend(document.body, {
        tagName: 'div',
        classNames: 'anti-abuse',
    });

    document.body.appendChild(menuContainer);
    document.body.appendChild(modalContainer);
}

function createHelpers(matrix, direction) {
    const size = GAME.size;
    const containerCount = Math.floor(size / 5);
    const helperContainer = document.querySelector(`.helper-${direction}`);

    for (let i = 0; i < containerCount; i++) {
        const container = createAndAppend(helperContainer, {
            tagName: 'div',
            classNames: [`helper-${direction}__container`],
        });

        for (let j = i * 5; j < Math.min((i + 1) * 5, size); j++) {
            const itemContainer = createAndAppend(container, {
                tagName: 'div',
                classNames: [`helper-${direction}__item`],
            });

            let count = 0;

            matrix.forEach((row, k) => {
                const condition =
                    direction === 'y' ? matrix[k][j] : matrix[j][k];

                if (condition) {
                    const conditionNext =
                        direction === 'y'
                            ? matrix[k + 1]?.[j]
                            : matrix[j]?.[k + 1];
                    count++;

                    if (k + 1 === size || !conditionNext) {
                        createAndAppend(itemContainer, {
                            tagName: 'span',
                            textContent: count,
                        });
                        count = 0;
                    }
                }
            });
        }
    }
}

function createCells() {
    const image = document.querySelector('.image');
    const count = GAME.size / 5;
    let countCreateCell = 0;

    CSS.setProperty('--count-columns', GAME.columns);

    for (let i = 0; i < count * count; i++) {
        const container = createAndAppend(image, {
            tagName: 'div',
            classNames: 'image__item',
            attributes: {
                column: i,
            },
        });

        let startIndex = null;
        let watcherCount = 0;

        if (i % count === 0) {
            startIndex = countCreateCell;
        } else {
            const cells = document.querySelectorAll(
                `[column="${i - 1}"] .image__cell`,
            );
            startIndex = Number(cells[4].getAttribute('index')) + 1;
        }

        for (let j = 0; j < 25; j++) {
            const row = createAndAppend(container, {
                tagName: 'div',
                classNames: 'image__cell',
                attributes: {
                    index: startIndex++,
                },
            });

            countCreateCell++;
            watcherCount++;

            if (watcherCount >= 5) {
                watcherCount = 0;
                startIndex = startIndex + 5 * (count - 1);
            }
        }
    }
}

function addEventListeners() {
    ELEMENTS.menuButton.addEventListener('click', mainMenuVisible);
    ELEMENTS.resetButton.addEventListener('click', resetGame);
    ELEMENTS.solutionButton.addEventListener('click', getSolution);
    ELEMENTS.continueButton.addEventListener('click', resumeLastGame);
    ELEMENTS.newGameButton.addEventListener('click', newGame);
    ELEMENTS.selectButton.addEventListener('click', selectMenuVisible);
    ELEMENTS.saveButton.addEventListener('click', saveGame);
    ELEMENTS.randomGameButton.addEventListener('click', randomGame);
    ELEMENTS.settingsButton.addEventListener('click', settingsMenuVisible);
    ELEMENTS.resultsButton.addEventListener('click', resultsMenuVisible);
    ELEMENTS.switchTheme.addEventListener('change', changeColorMode);
    ELEMENTS.settingsInput.forEach((x) =>
        x.addEventListener('click', setSettingsSound),
    );
    ELEMENTS.select.addEventListener('click', setDifficultyLevel);
    ELEMENTS.image.addEventListener('click', createInterval, { once: true });
    ELEMENTS.image.addEventListener('click', leftClick);
    ELEMENTS.image.addEventListener('contextmenu', createInterval, {
        once: true,
    });
    ELEMENTS.image.addEventListener('contextmenu', rightClick);
}

function setSettingsSound() {
    const flag = this.getAttribute('id').replace(/-\w+/, '');
    FLAGS[flag] = this.checked;
    localStorage.setItem(flag, this.checked);
}

function setDifficultyLevel() {
    const targetLevel =
        ELEMENTS.select.options[ELEMENTS.select.selectedIndex].value;

    if (LEVELS[targetLevel] !== GAME.level) {
        GAME.setSettings(IMAGES, LEVELS[targetLevel]);
        CSS.setProperty('--grid-cell', GAME.matrix.length);
        ELEMENTS.size.textContent = GAME.sizeForDisplay();
        localStorage.setItem('level-nonogram', GAME.level);
        newGame();
    }
}

function getSettingsSound() {
    for (const event in FLAGS) {
        if (localStorage.getItem(event)) {
            const isTrue = localStorage.getItem(event) === 'true';
            const settingItem = Array.from(ELEMENTS.settingsInput).find(
                (x) => x.getAttribute('id') === `${event}-sound`,
            );

            if (settingItem) settingItem.checked = isTrue;

            FLAGS[event] = isTrue;
        }
    }
}

function getColorSettings() {
    localStorage.getItem(localStorageKeys.SWITCH) === 'true'
        ? (ELEMENTS.switchTheme.checked = true)
        : (ELEMENTS.switchTheme.checked = false);

    CSS.setProperty(
        '--main-color',
        localStorage.getItem(localStorageKeys.MAIN),
    );
    CSS.setProperty(
        '--second-color',
        localStorage.getItem(localStorageKeys.SECOND),
    );
}

function createInterval() {
    TIMER.destroyed();
    TIMER.run();
}

function leftClick(event) {
    if (
        event.target.classList.contains('image__cell') &&
        !event.target.classList.contains('image__cell--deactive')
    ) {
        if (FLAGS.square) SOUNDS.square.play();
        event.target.classList.toggle('image__cell--active');
    }
    winGame();
}

function rightClick(event) {
    if (
        event.target.classList.contains('image__cell') &&
        !event.target.classList.contains('image__cell--active')
    ) {
        if (FLAGS.cross) SOUNDS.cross.play();
        event.target.classList.toggle('image__cell--deactive');
    }
    event.preventDefault();
}

function winGame() {
    const isGameWin = GAME.winGame(document.querySelectorAll('.image__cell'));

    if (isGameWin) {
        if (FLAGS.win) SOUNDS.win.play();
        ELEMENTS.modalButton.addEventListener('click', nextGame);
        ELEMENTS.modal.classList.add('modal__active');
        TIMER.updateTimerDisplay();
        TIMER.destroyed();
        saveResult();
    }
}

function nextGame() {
    ELEMENTS.image.addEventListener('click', createInterval, { once: true });
    ELEMENTS.modal.classList.remove('modal__active');
    TIMER.resetTimeDisplay();
    TIMER.setTime(0, 0);
    TIMER.destroyed();
    GAME.setSettings(IMAGES);

    destroyed();
    createCells();
    createHelpers(GAME.matrix, 'x');
    createHelpers(GAME.matrix, 'y');
}

function destroyed() {
    GAME.removeElementsBySelector('.helper-x__container');
    GAME.removeElementsBySelector('.helper-y__container');
    GAME.removeElementsBySelector('.helper-x__item');
    GAME.removeElementsBySelector('.helper-y__item');
    GAME.removeElementsBySelector('.image__cell');
    GAME.removeElementsBySelector('.image__item');
}

function saveGame() {
    GAME.saveGame(document.querySelectorAll('.image__cell'));
    TIMER.saveTimerData();
}

function resumeLastGame() {
    const lastGame = JSON.parse(localStorage.getItem('last_game-nonogram'));
    const timeGame = JSON.parse(localStorage.getItem('time_game-nonogram'));

    if (!lastGame) return;

    TIMER.reset();
    restoreTimer(timeGame);
    restoreGame(lastGame);

    ELEMENTS.image.addEventListener('click', createInterval, { once: true });

    GAME.loadGame(lastGame, document.querySelectorAll('.image__cell'));
}

function restoreTimer(timeGame) {
    TIMER.destroyed();
    TIMER.setTime(timeGame.seconds, timeGame.milliseconds);
    TIMER.updateTimerDisplay();
}

function restoreGame(lastGame) {
    GAME.setSettings(IMAGES, lastGame.level, lastGame.random);
    CSS.setProperty('--grid-cell', GAME.matrix.length);

    ELEMENTS.select.selectedIndex = parseInt(
        localStorage.getItem('level-nonogram'),
    );
    ELEMENTS.size.textContent = GAME.sizeForDisplay();

    destroyed();
    createCells();
    createHelpers(GAME.matrix, 'x');
    createHelpers(GAME.matrix, 'y');
}

function resetGame() {
    TIMER.reset();
    TIMER.destroyed();
    GAME.resetGame(document.querySelectorAll('.image__cell'));
    ELEMENTS.image.addEventListener('click', createInterval, { once: true });
}

function newGame() {
    ELEMENTS.newGameButton.classList.remove('menu__item-btn--active');
    ELEMENTS.antiAbuse.classList.remove('anti-abuse--on');
    TIMER.reset();
    TIMER.destroyed();

    ELEMENTS.image.addEventListener('click', createInterval, { once: true });

    GAME.setSettings(IMAGES);
    destroyed();
    createCells(GAME.matrix);
    createHelpers(GAME.matrix, 'x');
    createHelpers(GAME.matrix, 'y');
}

function randomGame() {
    TIMER.reset();
    TIMER.destroyed();
    GAME.setSettings(IMAGES, GAME.getRandomValue(0, 2));
    CSS.setProperty('--grid-cell', GAME.matrix.length);

    ELEMENTS.image.addEventListener('click', createInterval, { once: true });

    destroyed();
    createCells(GAME.matrix);
    createHelpers(GAME.matrix, 'x');
    createHelpers(GAME.matrix, 'y');
}

function selectGame() {
    GAME.setSettings(
        IMAGES,
        this.getAttribute('level'),
        this.getAttribute('random'),
    );
    CSS.setProperty('--grid-cell', GAME.matrix.length);

    ELEMENTS.size.textContent = GAME.sizeForDisplay();
    ELEMENTS.image.addEventListener('click', createInterval, { once: true });

    destroyed();
    createCells(GAME.matrix);
    createHelpers(GAME.matrix, 'x');
    createHelpers(GAME.matrix, 'y');
}

function getSolution() {
    GAME.solutionGame();
    TIMER.destroyed();

    antiAbuseSystemOn();
}

function changeColorMode() {
    const main = this.checked ? '255, 255, 255' : '0, 0, 0';
    const second = this.checked ? '0, 0, 0' : '255, 255, 255';

    CSS.setProperty('--main-color', main);
    CSS.setProperty('--second-color', second);

    localStorage.setItem('main-color-nonogram', main);
    localStorage.setItem('second-color-nonogram', second);
    localStorage.setItem('switch-nonogram', this.checked);
}

function cleaningDynamicElements(elements) {
    elements.forEach((item) => item.remove());
}

function saveResult() {
    const results = localStorage.getItem('results-nonogram');
    const arr = results ? JSON.parse(results) : [];

    arr.unshift({
        name: IMAGES[GAME.level][GAME.random].name,
        level: REVERSELEVELS[GAME.level],
        time: `${TIMER.addZero(TIMER.minutes)}:${TIMER.addZero(TIMER.seconds)}`,
    });

    if (arr.length > 5) arr.splice(5);
    localStorage.setItem('results-nonogram', JSON.stringify(arr));
}

function antiAbuseSystemOn() {
    toggleMenuButtons(true);
    ELEMENTS.antiAbuse.classList.add('anti-abuse--on');
    ELEMENTS.menuButton.classList.add('menu__item-btn--active');
    ELEMENTS.newGameButton.classList.add('menu__item-btn--active');
    ELEMENTS.newGameButton.addEventListener('click', antiAbuseSystemOff, {
        once: true,
    });
}

function antiAbuseSystemOff() {
    toggleMenuButtons(false);
    ELEMENTS.antiAbuse.classList.remove('anti-abuse--on');
    ELEMENTS.menuButton.classList.remove('menu__item-btn--active');
    ELEMENTS.newGameButton.classList.remove('menu__item-btn--active');
}

function toggleMenuButtons(activate) {
    ELEMENTS.menuButtons.forEach((item) => {
        if (activate) {
            item.classList.add('menu__item-btn--deactive');
            return;
        }

        item.classList.remove('menu__item-btn--deactive');
        return;
    });
}

function mainMenuVisible() {
    ELEMENTS.menuButton.style.zIndex = 2;
    ELEMENTS.menu.classList.add('menu__active');
    ELEMENTS.menu.addEventListener('click', mainMenuHidden);
}

function mainMenuHidden(event) {
    if (event.target.matches('.menu')) {
        const hasActiveElement = Array.from(ELEMENTS.menuInners)
            .slice(1)
            .findLast((item) => !item.classList.contains('deactive-element'));

        ELEMENTS.menuButton.style.zIndex = 3;
        hasActiveElement
            ? hasActiveElement.classList.add('deactive-element')
            : ELEMENTS.menu.classList.remove('menu__active');

        cleaningDynamicElements(document.querySelectorAll('.select__item'));
        cleaningDynamicElements(document.querySelectorAll('.results__item'));
        cleaningDynamicElements(document.querySelectorAll('.results__text'));
    }
}

function settingsMenuVisible() {
    ELEMENTS.menuInnerSetting.classList.remove('deactive-element');
}

function selectMenuVisible() {
    ELEMENTS.menuInnerSelect.classList.remove('deactive-element');
    getContentForSelectMenu();
}

function resultsMenuVisible() {
    ELEMENTS.menuInnerResults.classList.remove('deactive-element');
    getContentForResultsMenu();
}

function getContentForSelectMenu() {
    for (let i = 0; i < IMAGES.length; i++) {
        for (let j = 0; j < IMAGES[i].length; j++) {
            const { image, name, level, size } = IMAGES[i][j];
            const item = createAndAppend(ELEMENTS.selectList, {
                tagName: 'li',
                classNames: 'select__item',
                textContent: `${name[0].toUpperCase() + name.slice(1)} (${REVERSELEVELS[level]})`,
                attributes: {
                    level: i,
                    random: j,
                },
            });

            item.addEventListener('click', selectGame);
        }
    }
}

function getContentForResultsMenu() {
    const localResults = localStorage.getItem('results-nonogram');
    const results = localResults ? JSON.parse(localResults) : [];

    if (!results.length) {
        createAndAppend(ELEMENTS.menuInnerResults, {
            tagName: 'p',
            textContent: "You haven't won any games yet!",
            classNames: 'results__text',
        });
        return;
    }

    results
        .sort((a, b) => {
            const aTime = a.time
                .split(':')
                .reduce((acc, time) => 60 * acc + +time);
            const bTime = b.time
                .split(':')
                .reduce((acc, time) => 60 * acc + +time);

            return aTime - bTime;
        })
        .forEach((x, i) => {
            createAndAppend(ELEMENTS.resultList, {
                tagName: 'li',
                textContent: `Time:${results[i].time}, name:${results[i].name}, level:${results[i].level}`,
                classNames: 'results__item',
            });
        });
}
