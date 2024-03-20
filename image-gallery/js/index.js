'use strict';

const form = document.querySelector('.form');
const search = document.querySelector('.form__search');
const clear = document.querySelector('.form__clear');
const gallery = document.querySelectorAll('.gallery__item');

search.addEventListener('input', () => search.value !== '' ? clear.style.display = 'block' : clear.style.display = 'none');
clear.addEventListener('click', () => {
    search.value = '';
    clear.style.display = 'none';
    search.focus();
});

const accessKey = 'SfNF5lGwh9Np77ZftgIisCj1srL-JRkrHIv7EXobdkg';
let page = 1;
let keyword = 'nature';
let url = `https://api.unsplash.com/search/photos?page=${page}&per_page=30&query=${keyword}&client_id=${accessKey}`;


(async function () {
    keyword = 'nature';
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    results.forEach((item, index) => {
        gallery[index].style.backgroundImage = `url('${item.urls.regular}')`;
        gallery[index].href = item.links.html;
    })
})();

async function searchImages() {
    keyword = search.value;
    url = `https://api.unsplash.com/search/photos?page=${page}&per_page=30&query=${keyword}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    results.forEach((item, index) => {
        gallery[index].style.backgroundImage = `url('${item.urls.regular}')`
        gallery[index].href = item.links.html;
    })
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    page = 1;
    searchImages();
})

