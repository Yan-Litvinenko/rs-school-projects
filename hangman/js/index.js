'use strict';

const HINTANSWER = [
    ['ЭМЯБТ', 'MILF'], ['Hypertext Markup Language', 'HTML'], ['Cascading Style Sheets', 'CSS'],
    ['A device with a display for receiving television devices', 'TV'], ['A large group of aquatic gnathostomes, previously considered a superclass', 'FISH']
]
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let answer = null;  // HINTANSWER[answer][1] - ответ
let end_game = false;
let error_count = 0;

init();
createKeyboard();
getHint();
createSecretWord();

const modal = document.querySelector('.modal');
const error = document.querySelector('.game__error span');
const keyborad_item = document.querySelectorAll('.keyboard__item');

keyborad_item.forEach(item => item.addEventListener('click', isLetter))
window.addEventListener('keydown', isLetter);

function newGame() {
    const word_items = document.querySelectorAll('.word__item');
    const parts = document.querySelectorAll('.hangman__part');

    modal.classList.remove('modal__active');
    scroll.scrollOn();
    end_game = false;
    error_count = 0;
    error.innerHTML = '0 / 6';
    word_items.forEach(item => item.remove());
    keyborad_item.forEach(item => {
        item.classList.remove('keyboard__item_true');
        item.classList.remove('keyboard__item_false');
    });
    parts.forEach(item => item.classList.remove('hangman__part_visible'));

    getHint();
    createSecretWord();
}

function endGame() {
    const result = modal.querySelector('.modal__result');
    const secret = modal.querySelector('.modal__secret');
    const again = modal.querySelector('.modal__btn');

    again.addEventListener('click', newGame);
    result.innerHTML = error_count >= 6 ? 'Game over' : 'You winner!';
    secret.innerHTML = `Secret word: "${HINTANSWER[answer][1]}"`;
    modal.classList.add('modal__active');
    scroll.scrollOff();
    end_game = true;
}

function getError() {
    if (++error_count >= 6) endGame();
    const parts = document.querySelectorAll('.hangman__part');
    const part = Array.from(parts).find(item => {
        return !item.classList.contains('hangman__part_visible')
    });

    part.classList.add('hangman__part_visible');
    error.innerHTML = error_count + ' / 6';
}

function getLetter(letter) {
    const word_items = document.querySelectorAll('.word__item');
    const secret_word = HINTANSWER[answer][1];

    for (let i = 0; i < secret_word.length; i++) {
        if (secret_word[i] === letter) {
            word_items[i].innerHTML = letter;
            word_items[i].classList.add('word__item_open');
        }
    }

    const check = Array.from(word_items).every(item => item.classList.contains('word__item_open'))
    if (check) endGame()
}

function isLetter(e) {
    if (!end_game) {
        let letter = null;
        !e.key ? letter = this.innerHTML : letter = e.key.toUpperCase();
        const item = Array.from(keyborad_item).find(elem => elem.innerHTML === letter);

        if (ALPHABET.includes(letter)) {
            if (HINTANSWER[answer][1].includes(letter)) {
                item.classList.add('keyboard__item_true');
                getLetter(letter);
            }
            if (!item.classList.contains('keyboard__item_false') && !HINTANSWER[answer][1].includes(letter)) {
                item.classList.add('keyboard__item_false')
                getError();
            }
        }
    } else endGame();
}

function createSecretWord() {
    const word = document.querySelector('.word');

    for (let i = 0; i < HINTANSWER[answer][1].length; i++)
        word.insertAdjacentHTML('beforeend', '<div class="word__item"></div>')
}

function getHint() {
    const hint = document.querySelector('.game__hint span');
    const x = getRandomInt(0, HINTANSWER.length - 1);

    hint.innerHTML = HINTANSWER[x][0];
    answer = x;
}

function getRandomInt(min, max) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!localStorage.getItem('hangman_question')) {
        localStorage.setItem('hangman_question', random)
        return random;
    }
    if (random == localStorage.getItem('hangman_question')) {
        return getRandomInt(min, max);
    }

    localStorage.setItem('hangman_question', random)
    return random;
}

function createKeyboard() {
    const keyboard = document.querySelector('.keyboard');

    for (let i = 0; i < ALPHABET.length; i++)
        keyboard.insertAdjacentHTML('beforeend', `<div class="keyboard__item">${ALPHABET[i]}</div>`)
}

function init() {
    document.body.insertAdjacentHTML("beforeend", `
    <div class="wrapper">
        <div class="hangman">
            <img class="hangman__img" src="assets/images/gallows.png" alt="hangman">
            <img class="hangman__part hangman__part_head" src="assets/images/head.svg" alt="head">
            <img class="hangman__part hangman__part_body" src="assets/images/body.svg" alt="body">
            <img class="hangman__part hangman__part_hand-left" src="assets/images/hand-one.svg" alt="hand">
            <img class="hangman__part hangman__part_hand-right" src="assets/images/hand-two.svg" alt="hand">
            <img class="hangman__part hangman__part_leg-left" src="assets/images/leg-one.svg" alt="leg">
            <img class="hangman__part hangman__part_leg-right" src="assets/images/leg-two.svg" alt="leg">
        </div>
        <div class="game">
            <h1 class="game__title">Hangman game</h1>
            <div class="word"></div>
            <div class="game__hint">
                Hint: <span></span>
            </div>
            <div class="game__error">
                Incorrect guesses: <span>0 / 6</span>
            </div>
        </div>
        <div class="keyboard"></div>
    </div>
    <div class="modal">
    <div class="modal__inner">
        <h2 class="modal__result"></h2>
        <div class="modal__secret"></div>
        <button class="modal__btn" type="button">Again</button>
    </div>
</div>
    `)
}

const scroll = {
    position: 0,
    scrollOff() {
        scroll.position = window.scrollY;
        document.body.style.cssText = `
            overflow: hidden;
            padding-right: ${window.innerWidth - document.body.offsetWidth}px;
            position: fixed;
            top: -${scroll.position}px;
            left: 0;
            height: 100vh;
            width: 100vw;
            `;
        document.documentElement.style.scrollBehavior = 'unset';
    },
    scrollOn() {
        document.body.style.cssText = ``;
        window.scrollTo({
            top: scroll.position,
        });
        document.documentElement.style.scrollBehavior = '';
    }
};