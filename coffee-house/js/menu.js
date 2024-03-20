const PRODUCT = [
    { size: ['200 ml', '300 ml', '400 ml'], additives: ['Sugar', 'Cinnamon', 'Syrup'] },
    { size: ['200 ml', '300 ml', '400 ml'], additives: ['Sugar', 'Lemon', 'Syrup'] },
    { size: ['50 g', '100 g', '150 g'], additives: ['Berries', 'Nuts', 'Jam'] }
]
const burger = document.querySelector('.navigation');
const list = document.querySelector('.navigation__list');
const list_item = document.querySelectorAll('.navigation__item');
const tabs_item = document.querySelectorAll('.tabs__item');
const drink_item = document.querySelectorAll('.menu__drink');
const load = document.querySelectorAll('.menu__load');

burger.addEventListener('click', burgerMenu);
load.forEach(item=> item.addEventListener('click', loadMenu));
list_item.forEach(item => item.addEventListener('click', burgerClose));
tabs_item.forEach(item => item.addEventListener('click', tabs));
drink_item.forEach(item => item.addEventListener('click', modal));

function loadMenu(){
    const menu_item = this.closest('.menu__item');
    menu_item.classList.remove('menu__item--unload');
}

function burgerMenu() {
    list.addEventListener('click', (event) => event.stopPropagation());
    list.classList.toggle('navigation__list--open');
}

function burgerClose() {
    list.classList.remove('navigation__list--open');
}

function tabs() {
    const id = this.dataset.tab;
    const menu = document.querySelector('#menu-' + id);
    const menu_items = document.querySelectorAll('.menu__item');
    menu_items.forEach(item => item.classList.remove('menu__item--active'));
    menu.classList.add('menu__item--active');
}

function modal() {
    const thisDrink = this;
    const modal = document.getElementById('modal');
    const total_title = document.querySelector('.modal__total-title span');
    const volume_item = document.querySelectorAll('[data-volume-price]');
    const additives_item = document.querySelectorAll('[data-additives-price]');
    const price_item = document.querySelectorAll('.modal__input');
    const id = Number(this.closest('.menu__item').id.replace(/menu-/g, '')) - 1;
    let original_price = null;

    price_item.forEach(item => item.addEventListener('change', price));
    modal.classList.remove('modal__deactive');
    modal.addEventListener('click', close);
    addInfoDrink();
    scrollOff();

    function close(event) {
        if (event.target === this || event.target === getDomElement('.modal__btn', false)) {
            this.classList.add('modal__deactive');
            total_title.innerHTML = original_price + '$';
            volume_item[0].checked = true;
            additives_item.forEach(item => item.checked = false)
            setTimeout(scrollOn, 100);
        }
    };

    function addInfoDrink() {
        const modal_size = document.querySelectorAll('.modal__info-size');
        const modal_additives = document.querySelectorAll('.modal__addivitives-drink');
        modal_size.forEach((item, index) => item.textContent = PRODUCT[id].size[index]);
        modal_additives.forEach((item, index) => item.textContent = PRODUCT[id].additives[index]);
        getDomElement('.modal__title', false).innerHTML = getDomElement('.menu__title').textContent;
        getDomElement('.modal__description', false).innerHTML = getDomElement('.menu__text').textContent;
        getDomElement('.modal__product img', false).src = getDomElement('.menu__picture img').src;
        getDomElement('#source-1', false).srcset = getDomElement('.menu__picture img').src.replace(/\.jpg/g, '.avif');
        getDomElement('#source-2', false).srcset = getDomElement('.menu__picture img').src.replace(/\.jpg/g, '.webp');
        getDomElement('.modal__total-title span', false).innerHTML = getDomElement('.menu__price').textContent;
        original_price = Number(total_title.innerHTML.replace(/\$/, ''));
    }

    function getDomElement(element, flag = true) {
        return flag ? thisDrink.querySelector(`${element}`) : document.querySelector(`${element}`);
    }

    function price() {
        let total_volume = 0;
        let total_additives = 1.50;

        additives_item.forEach(item => item.checked ? total_additives += 0.50 : total_additives -= 0.50);
        volume_item.forEach(item => item.checked ? total_volume = original_price + Number(item.dataset.volumePrice) : total_volume);
        total_title.innerHTML = (total_volume + total_additives).toFixed(2) + '$';
    }
}

function scrollOn() {
    document.body.style.cssText = ``;
    document.documentElement.style.scrollBehavior = '';
}

function scrollOff() {
    scroll.position = window.scrollY;
    document.body.style.cssText = `
        overflow: hidden;
        padding-right: ${window.innerWidth - document.body.offsetWidth}px;
        height: 100vh;
        width: 100vw;
        `;
    document.documentElement.style.scrollBehavior = 'unset';
}
