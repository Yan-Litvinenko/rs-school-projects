'use strict';

const container = document.querySelector('.container');
const author = document.querySelector('.track__author');
const name = document.querySelector('.track__name');
const play = document.querySelector('.track__play');
const next = document.querySelector('.track__forward');
const back = document.querySelector('.track__backward');
const volume = document.querySelector('.player__volume');

const image = document.querySelector('.player__top');
const progress = document.querySelector('.player__progress');

const durationTime = document.querySelector('.player__duration-time');
const currentTime = document.querySelector('.player__current-time');


//Автор, путь к файлу, название трека, картинка, цвет вектора, цвет панели, цвет при наведении в футере, для перебора картинок;
const MUSIC__PLAYER = [
    ['Warcraft 3', 'arthas.mp3', "Восхождение", 'arthas_1.jpg', 'arthasFon.jpg', 'rgb(4, 194, 226)', 'rgb(18, 79, 139)', '4, 194, 226', ['arthas_1.jpg', 'arthas_2.jpg', 'arthas_3.jpg', 'arthas_4.jpg', 'arthas_5.jpg', 'arthas_6.jpg', 'arthas_7.jpg', 'arthas_8.jpg', 'arthas_9.jpg', 'arthas_10.jpg', 'arthas_11.jpg',]],
    ['Король и Шут', 'love.mp3', "Воспоминание о былой любви", 'love.jpg', 'KISH.jpg', 'rgb(254, 230, 0)', 'rgb(207, 51, 48)', '207, 51, 48', ['love.jpg'],],
    ['Король и Шут', 'fred.mp3', "Фред", 'fred.jpg', 'KISH.jpg', 'rgb(254, 230, 0)', 'rgb(207, 51, 48)', '207, 51, 48', ['fred.jpg'],],
    ['Король и Шут', 'myaso.mp3', "Ели мясо мужики", 'myaso.jpg', 'KISH.jpg', 'rgb(254, 230, 0)', 'rgb(207, 51, 48)', '207, 51, 48', ['myaso.jpg'],],
];


const audio = new Audio();
let countSong = 0;
let flag = false;
let interval;
let imageInterval;


function loadSong(count) {
    author.innerHTML = MUSIC__PLAYER[count][0];
    audio.src = `assets/audio/${MUSIC__PLAYER[count][1]}`;
    name.innerHTML = MUSIC__PLAYER[count][2];
    image.style.backgroundImage = `url(assets/images/${MUSIC__PLAYER[count][3]})`;
    container.style.backgroundImage = `url(assets/images/${MUSIC__PLAYER[count][4]})`;
    document.documentElement.style.setProperty('--colorVector', MUSIC__PLAYER[count][5]);   //меняем вектор
    document.documentElement.style.setProperty('--color', MUSIC__PLAYER[count][6]);         //панель
    document.documentElement.style.setProperty('--colorShadow', MUSIC__PLAYER[count][7]);   //цвет при наведении
}
loadSong(countSong)

audio.addEventListener('durationchange', () => durationTime.textContent = getTime(audio.duration)); //время общее
audio.addEventListener('ended', nextSong)
play.addEventListener('click', () => flag ? pauseSong() : playSong());
next.addEventListener('click', nextSong);
back.addEventListener('click', backSong);


function playSong() {
    play.src = "assets/svg/pause.png"
    flag = true;
    audio.play();
    interval = setInterval(updateProgress, 10);
}

function pauseSong() {
    play.src = "assets/svg/play.png"
    flag = false;
    audio.pause();
    clearInterval(interval);
}

function nextSong() {
    countSong === MUSIC__PLAYER.length - 1 ? countSong = 0 : countSong++;
    image.style.transition = ''; //сброс анимации
    loadSong(countSong);
    playSong();
}

function backSong() {
    countSong === 0 ? countSong = MUSIC__PLAYER.length - 1 : countSong--;
    image.style.transition = ''; //сброс анимации
    loadSong(countSong);
    playSong();
}

function musicVolume() {
    audio.volume = volume.value / 100;
}

function progressControl(event) {
    audio.currentTime = (event.target.value / 100) * audio.duration;
}

function updateProgress() {
    progress.value = (100 * audio.currentTime) / audio.duration;
    currentTime.textContent = getTime(audio.currentTime);

    if (countSong === 0) {
        let whichImg = Math.floor(audio.currentTime.toFixed(0) / MUSIC__PLAYER[countSong][8].length);

        let img = new Image();
        img.onload = function () {
            image.style.transition = 'all 3s';
            image.style.backgroundImage = `url(assets/images/${MUSIC__PLAYER[countSong][8][whichImg]})`;
        }
        img.src = `assets/images/${MUSIC__PLAYER[countSong][8][whichImg]}`
    }
}

function getTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) {
        return '0' + minutes + ':' + '0' + seconds;
    }
    return '0' + minutes + ':' + seconds;
}
