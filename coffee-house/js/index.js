'use strict';

let width_progress = 0;
let slider_count = 0;
let auto_swipe = setInterval(autoChange, 40)
let xDown = null;
let yDown = null;

const burger = document.querySelector('.navigation');
const list = document.querySelector('.navigation__list');
const list_item = document.querySelectorAll('.navigation__item');
const slider = document.querySelector('.slider__inner');
const slider_item = document.querySelectorAll('.slider__item-inner');
const next_slide = document.querySelector('.slider__vector--right');
const back_slide = document.querySelector('.slider__vector--left');
const pagination_item = document.querySelectorAll('.pagination__item');
const pagination_progress = document.querySelectorAll('.pagination__progress');

const pauseAutoChange = () => clearInterval(auto_swipe);
const continueAutoChange = () => auto_swipe = setInterval(autoChange, 40);
const burgerClose = () =>  list.classList.remove('navigation__list--open');

burger.addEventListener('click', burgerMenu);
next_slide.addEventListener('click', nextSlide);
back_slide.addEventListener('click', backSlide);
slider.addEventListener('touchstart', touchStart);
slider.addEventListener('touchmove', touchMove);

list_item.forEach(item => item.addEventListener('click', burgerClose));
slider_item.forEach(item => {
    if (window.matchMedia("(max-width: 768px)").matches) {
        item.addEventListener('touchstart', pauseAutoChange);
        item.addEventListener('touchend', continueAutoChange);
    } else {
        item.addEventListener('mouseover', pauseAutoChange);
        item.addEventListener('mouseout', continueAutoChange);
    }
})

function burgerMenu() {
    list.addEventListener('click', (event) => event.stopPropagation());
    list.classList.toggle('navigation__list--open');
}

function autoChange() {
    const progress = pagination_progress[slider_count];
    progress.style.width = `${width_progress}%`;
    width_progress += 1;

    if (width_progress > 100) {
        progress.style.width = '0%'
        nextSlide();
    }
}

function nextSlide() {
    slider_count++;
    if (slider_count >= 3) slider_count = 0;
    rollSlider(slider_count);
}

function backSlide() {
    slider_count--;
    if (slider_count < 0) slider_count = 2;
    rollSlider(slider_count);
}

function rollSlider(count) {
    pagination_item.forEach(item => item.classList.remove('pagination__item--active'));
    pagination_progress.forEach(item => item.style.width = '0%');
    pagination_item[count].classList.add('pagination__item--active');
    slider.style.transform = `translateX(-${slider_count}00%)`;
    width_progress = 0;
}

function touchStart(event) {
    xDown = event.touches[0].clientX;
    yDown = event.touches[0].clientY;
};

function touchMove(event) {
    if (!xDown || !yDown) return;

    let xUp = event.touches[0].clientX;
    let yUp = event.touches[0].clientY
    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) nextSlide();
        if (xDiff < 0) backSlide();
    }
    xDown = null;
    yDown = null;
};
