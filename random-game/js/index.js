'use strict';

let xDown = null;
let yDown = null;

const GAME__BOARD = document.querySelector('.game__board');                                  //доска для игры      
const GAME__CELLS = [];                                                                      //Массив с ячейками
const COLORS__CELL = {
    2: 'rgb(238, 228, 218)',
    4: 'rgb(237, 224, 200)',
    8: 'rgb(242, 177, 121)',
    16: 'rgb(245, 149, 99)',
    32: 'rgb(245, 124, 95)',
    64: 'rgb(247, 93, 60)',
    128: 'rgb(243, 217, 107)',
    256: 'rgb(237, 204, 97)',
    512: 'rgb(237, 200, 80)',
    1024: 'rgb(237, 197, 63)',
    2048: 'rgb(236, 194, 48)',
}

const setupInputOnce = () => window.addEventListener('keydown', oneTimeEvent, { once: true }); //подписались 1 раз на событие
const moveDown = () => partyCellsByColumn().forEach(item => slideTiles(item.reverse()));
const moveRight = () => partyCellsByRow().forEach(item => slideTiles(item.reverse()));
const moveUp = () => partyCellsByColumn().forEach(item => slideTiles(item));
const moveLeft = () => partyCellsByRow().forEach(item => slideTiles(item));
const canMove = (groupedCells) => groupedCells.some(group => canMoveInGroup(group));
const canMoveDown = () => canMove(partyCellsByColumn().map(item => item.reverse()));
const canMoveRight = () => canMove(partyCellsByRow().map(item => item.reverse()));
const canMoveUp = () => canMove(partyCellsByColumn());
const canMoveLeft = () => canMove(partyCellsByRow());
const unlinkTile = cell => cell.removeAttribute('child');
const isEmpty = cell => cell.hasAttribute('child');

const buttonsNewGame = document.querySelectorAll('[data-new-game]');
const modalOpen = document.querySelectorAll(['[data-modal-button]']);
const continueGame = document.querySelector('[data-continue]');
const score = document.querySelector('[data-statistics="0"]');
const best = document.querySelector('[data-statistics="1"]');
const loadSave = document.querySelector('[data-load-save]');
const save = document.querySelector('[data-save-game]');
const reset = document.querySelector('[data-reset]')
const wrapper = document.querySelector('.wrapper__inner');
const victory = document.querySelector('.victory');
const success = document.querySelector('.success');
const main = document.getElementById('modal-1')
const menu = document.querySelectorAll('.modal');
const localGame = localStorage.getItem('2048');

loadSave.addEventListener('click', () => location.reload());
wrapper.addEventListener('touchstart', handleTouchStart);
wrapper.addEventListener('touchmove', handleTouchMove);
continueGame.addEventListener('click', gameContinue);
reset.addEventListener('click', resetSettings);
save.addEventListener('click', saveInMenu);
window.addEventListener('blur', saveGame);

if (localGame === null) localStorage.setItem('2048', JSON.stringify({
    'score': '0',
    'best': '0',
    'previous-games': [],
    'win': false,
    'game': true
}));

score.textContent = getDataInLocalStorage('2048', 'score');
best.textContent = getDataInLocalStorage('2048', 'best');
setupInputOnce()
addNewResult()

buttonsNewGame.forEach(item => item.addEventListener('click', newGame));
menu.forEach(item => item.addEventListener('click', (event) => {
    const click = event.composedPath().includes(item.querySelector('.modal__inner'));
    if (!click && item.classList.contains('modal__active')) {
        if (success) success.remove();
        item.classList.remove('modal__active');
        wrapper.addEventListener('touchstart', handleTouchStart);
        wrapper.addEventListener('touchmove', handleTouchMove);
    }
}));

modalOpen.forEach(item => item.addEventListener('click', () => {
    const previousGames = getDataInLocalStorage('2048', 'previous-games');
    const resultItems = document.querySelectorAll('.menu-results__item');
    const id = item.dataset.modalButton;
    const ol = document.querySelector('.menu-results__list');
    const modal = document.querySelector('#modal-' + id);

    wrapper.removeEventListener('touchstart', handleTouchStart);
    wrapper.removeEventListener('touchmove', handleTouchMove);

    if (id == 2) {                                                                       //заливаем результаты игр
        resultItems.forEach(item => item.remove());                                      //Удаляем предыдущие
        for (let i = previousGames.length - 1; i >= 0; i--) {
            const li = document.createElement('li');
            li.classList.add('menu-results__item')
            previousGames[i] ? li.textContent = `${i + 1}. ${previousGames[i]}` : li.textContent = `${i + 1}.`;
            ol.prepend(li);
        }
    }
    modal.classList.add('modal__active');
}))

//Меню закрыть
const close = document.querySelectorAll('.close');
close.forEach(item => item.addEventListener('click', () => {
    const parent = item.closest('.modal');
    parent.classList.remove('modal__active')

    if (success) success.remove();
    if (!main.classList.contains('modal__active')) {
        wrapper.addEventListener('touchstart', handleTouchStart);
        wrapper.addEventListener('touchmove', handleTouchMove);
    }
}))

function newGame() {
    const GAME__TILES = document.querySelectorAll('.game__tile');
    GAME__CELLS.forEach(item => item.removeAttribute('child'));
    GAME__TILES.forEach(item => item.remove());
    score.textContent = 0;
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    setDataInLocalStorage('2048', 'save-game', []);
    setDataInLocalStorage('2048', 'game', true);
    setDataInLocalStorage('2048', 'win', false);
    setDataInLocalStorage('2048', 'score', '0');
    createTile(getRandomEmptyCell())
    changeResultGame();
    setupInputOnce()
    addNewResult()
    closeModal();
}

function addNewResult() {                                                //Добавляем новый результат, если он больше 0
    const prevGame = getDataInLocalStorage('2048', 'previous-games');
    if (prevGame[0] !== '0') {
        prevGame.unshift('0')
        setDataInLocalStorage('2048', 'previous-games', prevGame);
    }
}

function changeResultGame() {                                           //Меняем результат игры
    let lastGame = getDataInLocalStorage('2048', 'previous-games');
    if (Number(score.textContent) > 0) lastGame[0] = score.textContent;
    if (lastGame.length > 10) lastGame = lastGame.slice(0, 10);
    setDataInLocalStorage('2048', 'previous-games', lastGame);
}

function createBoard(cells = 4) {
    const CELL__COUNT = cells * cells;                                  //Сколько будет ячеек    
    for (let i = 0; i < CELL__COUNT; i++) {                             //Создаём ячейки
        const CELL = createCell(i % cells, Math.floor(i / cells), i);   //Ячейки, колонки и ряды для сортировки 
        GAME__BOARD.append(CELL);
        GAME__CELLS.push(CELL);
    }
}

if (getDataInLocalStorage('2048', 'save-game') && getDataInLocalStorage('2048', 'save-game').length > 0) {
    addSaveGame();
} else {
    createBoard()
    createTile(getRandomEmptyCell())
}

function createCell(x, y, position) {
    const cell = document.createElement('div');
    cell.setAttribute('cell', position)
    cell.setAttribute('x', x)
    cell.setAttribute('y', y)
    cell.classList.add('game__cell');
    return cell;
}

function createTile(cell) {                                             //Создаем плитку
    const TILE = document.createElement('div');
    TILE.classList.add('game__tile');
    TILE.value = Math.random() > 0.1 ? 2 : 4;                           //Случайное значение
    TILE.textContent = TILE.value;
    GAME__BOARD.append(TILE);
    setXY(cell, TILE);
    linkTile(cell, TILE);
    getColorTile(TILE, TILE.textContent);
}

function partyCellsByColumn() {
    return GAME__CELLS.reduce((result, item) => {
        result[item.getAttribute('x')] = result[item.getAttribute('x')] || [];
        result[item.getAttribute('x')][item.getAttribute('y')] = item;
        return result;
    }, [])
}

function partyCellsByRow() {
    return GAME__CELLS.reduce((result, item) => {
        result[item.getAttribute('y')] = result[item.getAttribute('y')] || [];
        result[item.getAttribute('y')][item.getAttribute('x')] = item;
        return result;
    }, []);
}

function getRandomEmptyCell() {
    const empty = GAME__CELLS.filter(item => !isEmpty(item));                      //Получаем все ячейки в которых ничего нету
    return empty[Math.floor(Math.random() * empty.length)]                         //Получаем случайную пустую ячейку
}

function setXY(cell, tile) {
    if (cell && tile) {
        tile.style.setProperty('--x', cell.getAttribute('x'));                     //Значение родителя
        tile.style.setProperty('--y', cell.getAttribute('y'));                     //Значение родителя
    }
}

function linkTile(cell, tile) {
    if (cell && tile) {
        cell.setAttribute('child', true);
        tile.setAttribute('tile', cell.getAttribute('cell'));
    }
}

function canAccept(prevCell, nextCell) {
    const numPrevTile = prevCell.getAttribute('cell');                               //номер предыдущей плитки
    const numNextTile = nextCell.getAttribute('cell');
    const prevTile = document.querySelector(`[tile="${numPrevTile}"]`);
    const nextTile = document.querySelector(`[tile="${numNextTile}"]`);
    //предыдущая и следующая плитка существуют, и их значения равны
    return !isEmpty(prevCell) || (prevTile && nextTile && !prevCell.hasAttribute('merge') && Number(prevTile.textContent) === Number(nextTile.textContent));
}

function tileSlide(prevCell, nextCell) {
    const tile = document.querySelector(`[tile="${prevCell.getAttribute('cell')}"]`);          //нашли плитку, которую надо сдвинуть
    linkTile(nextCell, tile)                                                                   //привязать к новой
    setXY(nextCell, tile);                                                                     //новые значения ХУ
}

function tileSlideForMerge(firstCell, secondCell) {
    const firstTile = document.querySelector(`[tile="${firstCell.getAttribute('cell')}"]`);    //нашли плитку, которую надо сдвинуть
    const secondTile = document.querySelector(`[tile="${secondCell.getAttribute('cell')}"]`);
    const tileValue = Number(secondTile.textContent) + Number(firstTile.textContent);
    secondCell.setAttribute('merge', true);
    secondTile.textContent = tileValue;
    setXY(secondCell, firstTile);
    if (tileValue === 2048 && !getDataInLocalStorage('2048', 'win')) setDataInLocalStorage('2048', 'game', false);
    firstTile.addEventListener('transitionend', () => {
        getColorTile(secondTile, tileValue);
        changeResultGame();
        firstTile.remove()
        secondCell.removeAttribute('merge');
        if (tileValue === 2048 && !getDataInLocalStorage('2048', 'win')) win();
    })
    rating(tileValue);
}

function handleTouchStart(event) {
    xDown = event.touches[0].clientX;
    yDown = event.touches[0].clientY;
};

function handleTouchMove(event) {
    if (!xDown || !yDown) return;

    let xUp = event.touches[0].clientX;
    let yUp = event.touches[0].clientY
    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            if (!canMoveLeft()) {
                setupInputOnce();
                return;
            }
            moveLeft();
        } else {
            if (!canMoveRight()) {
                setupInputOnce();
                return;
            }
            moveRight();
        }
    } else {
        if (yDiff > 0) {
            if (!canMoveUp()) {
                setupInputOnce();
                return;
            }
            moveUp();
        } else {
            if (!canMoveDown()) {
                setupInputOnce();
                return;
            }
            moveDown();
        }
    }
    xDown = null;
    yDown = null;
    createTile(getRandomEmptyCell());
};

function oneTimeEvent(event) {
    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
        gameOver();
        return;
    }

    if (event.key === 'ArrowUp') {
        if (!canMoveUp()) {
            setupInputOnce();
            return;
        }
        moveUp();
    }

    if (event.key === 'ArrowDown') {
        if (!canMoveDown()) {
            setupInputOnce();
            return;
        }
        moveDown();
    }

    if (event.key === 'ArrowLeft') {
        if (!canMoveLeft()) {
            setupInputOnce();
            return;
        }
        moveLeft();
    }

    if (event.key === 'ArrowRight') {
        if (!canMoveRight()) {
            setupInputOnce();
            return;
        }
        moveRight();
    }

    createTile(getRandomEmptyCell());
    if (getDataInLocalStorage('2048', 'game')) setTimeout(setupInputOnce, 200);   //после нажатия снова подписываемся на событие      
}

function slideTiles(party) {
    for (let i = 1; i < party.length; i++) {                                      //ищем не пустую ячейку
        if (!isEmpty(party[i])) continue;
        const cellWithTile = party[i];                                            //Не пустая ячейка, т.к. выше проверили
        let desiredСell;
        let j = i - 1;                                                            //предыдущая ячейка
        while (j >= 0 && canAccept(party[j], cellWithTile)) {                     //проверяем, что предыдущая плитка пустая или у неё тоже значение
            desiredСell = party[j];                                               //пустая ячейка
            j--;
        }

        if (!desiredСell) continue;                                               //Переходим на след альтерацию, если предыдущии, была с другим значением
        desiredСell && !isEmpty(desiredСell) ? tileSlide(cellWithTile, desiredСell) : tileSlideForMerge(cellWithTile, desiredСell);
        unlinkTile(cellWithTile);
    }
}

function canMoveInGroup(party) {
    return party.some((item, index) => {
        if (index === 0) return false;
        if (!isEmpty(item)) return false;
        const desiredCell = party[index - 1];
        return canAccept(desiredCell, item);
    });
}

function getColorTile(tile, value) {
    value == '2' || value == '4' ? tile.style.color = 'rgb(116, 108, 97)' : tile.style.color = '#fff';
    tile.style.backgroundColor = COLORS__CELL[value];
}

function rating(value) {
    score.textContent = Number(score.textContent) + value;
    if (Number(best.textContent) < Number(score.textContent)) {
        best.textContent = score.textContent;
        setDataInLocalStorage('2048', 'best', best.textContent);
    }
}

function setDataInLocalStorage(keyStorage, keyObject, newValue) {
    const localData = JSON.parse(localStorage.getItem(keyStorage));
    localData[keyObject] = newValue;
    localStorage.setItem(keyStorage, JSON.stringify(localData));
}

function getDataInLocalStorage(keyStorage, keyObject) {
    if (localGame === null) localStorage.setItem('2048', JSON.stringify({
        'score': '0',
        'best': '0',
        'previous-games': [],
        'win': false,
        'game': true
    }));

    const localData = JSON.parse(localStorage.getItem(keyStorage));
    return localData[keyObject];
}

function gameOver() {
    const game_over = document.querySelector('.game-over');
    game_over.classList.add('modal__active');
    document.querySelector('.game-over__description').textContent += ' ' + score.textContent;
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchmove', handleTouchMove);
    addNewResult();
}

function closeModal() {
    const modal = document.querySelectorAll('[data-modal]');
    modal.forEach(item => item.classList.remove('modal__active'));
}

function win() {
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchmove', handleTouchMove);
    victory.classList.add('modal__active');
}

function gameContinue() {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    setDataInLocalStorage('2048', 'game', true);
    setDataInLocalStorage('2048', 'win', true);
    victory.classList.remove('modal__active');
    setupInputOnce();
}

function saveInMenu() {
    const span = document.createElement('span');
    span.textContent = 'Game saved!';
    span.classList.add('success');
    if (document.querySelector('.success')) document.querySelector('.success').remove();
    document.querySelector('.menu-main__list').insertAdjacentElement('beforebegin', span);
    saveGame();
}

function resetSettings() {
    localStorage.removeItem('2048');
    score.textContent = '0';
    best.textContent = '0';
    location.reload();
}

function saveGame() {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);

    if (localGame === null) localStorage.setItem('2048', JSON.stringify({
        'score': '0',
        'best': '0',
        'previous-games': [],
        'win': false,
        'game': true
    }));

    const TILES = document.querySelectorAll('.game__tile');
    const SAVE__GAME = [];
    const CELLS_FOR_SAVE = [];
    const TILE_FOR_SAVE = [];

    for (let i = 0; i <= 15; i++) {
        if (GAME__CELLS[i].hasAttribute('child')) {
            CELLS_FOR_SAVE.push({
                'cell': GAME__CELLS[i].getAttribute('cell'),
                'x': GAME__CELLS[i].getAttribute('x'),
                'y': GAME__CELLS[i].getAttribute('y'),
                'child': GAME__CELLS[i].getAttribute('child')
            })
        } else {
            CELLS_FOR_SAVE.push({
                'cell': GAME__CELLS[i].getAttribute('cell'),
                'x': GAME__CELLS[i].getAttribute('x'),
                'y': GAME__CELLS[i].getAttribute('y'),
            })
        }
    }

    TILES.forEach(item => {
        TILE_FOR_SAVE.push({
            'tile': item.getAttribute('tile'),
            'x': item.style.getPropertyValue('--x'),
            'y': item.style.getPropertyValue('--y'),
            'value': item.textContent
        })
    })

    SAVE__GAME.push(CELLS_FOR_SAVE, TILE_FOR_SAVE);
    setDataInLocalStorage('2048', 'save-game', SAVE__GAME);
    setDataInLocalStorage('2048', 'score', score.textContent);
}

function addSaveGame() {
    const SAVE__GAME = getDataInLocalStorage('2048', 'save-game');
    const CELLS_FOR_SAVE = SAVE__GAME[0];
    const TILE_FOR_SAVE = SAVE__GAME[1];
    const GAME__TILES = document.querySelectorAll('.game__tile');
    GAME__CELLS.forEach(item => item.remove());
    GAME__TILES.forEach(item => item.remove());

    CELLS_FOR_SAVE.forEach(item => {
        const cell = document.createElement('div');
        cell.classList.add('game__cell');
        cell.setAttribute('cell', item.cell);
        cell.setAttribute('x', item.x);
        cell.setAttribute('y', item.y);
        if (item.child) cell.setAttribute('child', true);
        GAME__CELLS.push(cell);
        GAME__BOARD.append(cell);
    })

    TILE_FOR_SAVE.forEach(item => {
        const tile = document.createElement('div');
        tile.classList.add('game__tile');
        tile.setAttribute('tile', item.tile);
        tile.style.setProperty('--x', item.x);
        tile.style.setProperty('--y', item.y);
        tile.textContent = item.value;
        getColorTile(tile, tile.textContent);
        GAME__BOARD.append(tile)
    })
}

