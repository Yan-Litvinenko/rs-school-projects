'use strict';
const userDataJson = localStorage.getItem('user');                                   //юзер в формате JSON
const userDataObject = JSON.parse(userDataJson);                                     //юзер в формате JS

//Мобильное меню
; (function () {
    const burger = document.querySelector('.menu__mobile');
    const menuList = document.querySelector('.menu__list');
    burger.addEventListener('click', () => {
        menuList.classList.toggle('menu__list--active');
        menuList.classList.contains('menu__list--active') ? burger.classList.add('menu__mobile--active') : burger.classList.remove('menu__mobile--active');
    })

    document.querySelectorAll('.menu__item').forEach(function (element) {
        element.addEventListener('click', function () {
            menuList.classList.remove('menu__list--active');
            burger.classList.remove('menu__mobile--active');
        })
    })

    window.addEventListener('click', function (event) {
        const menu = document.querySelector('.menu');
        const click = event.composedPath().includes(menu);
        if (!click && menuList.classList.contains('menu__list--active')) {
            menuList.classList.remove('menu__list--active');
            burger.classList.remove('menu__mobile--active');
        };
    })
})();

//Профиль/логин/регистрация
; (function () {
    const list = document.querySelector('.user__menu');
    document.querySelectorAll('[data-user]').forEach(element => {
        element.addEventListener('click', () => {
            list.classList.toggle('user__menu--mobile');
        })
    })

    //Профиль/логин/регистрация закрыть по клику вне блока
    window.addEventListener('click', function (event) {
        const menu = document.querySelector('.user');
        const click = event.composedPath().includes(menu);
        if (!click && list.classList.contains('user__menu--mobile')) list.classList.remove('user__menu--mobile');
    })
})();

//МОДАЛЬНЫЕ ОКНА
; (function () {
    //Открыть модальные окна
    const openButton = document.querySelectorAll('[data-modal-button]');
    openButton.forEach((element) => {
        element.addEventListener('click', function () {
            const id = this.dataset.modalButton;
            const modal = document.querySelector('#modal-' + id);
            modal.classList.add('modal__visible');
            scroll.scrollOff();
        })
    })

    //Закрыть модальное окно по крестику
    const closeButton = document.querySelectorAll('.modal__close');
    closeButton.forEach((element) => {
        element.addEventListener('click', function () {
            const modal = this.closest('.modal');
            modal.classList.remove('modal__visible');
            scroll.scrollOn();
            //очистка после закрытия окна
            document.querySelectorAll('.modal').forEach(element => {
                if (!element.classList.contains('modal__visible')) {
                    document.querySelectorAll('.modal__field').forEach(item => {
                        item.value = '';
                        item.style.border = '';
                        let errors = modal.querySelectorAll('.modal__error');
                        errors.forEach(element => element.remove());
                    })
                }
            })
        })
    })

    //Закрыть модальное окно по клику вне блока
    const modals = document.querySelectorAll('.modal');
    modals.forEach(element => {
        element.addEventListener('click', function () {
            element.classList.remove('modal__visible');
            scroll.scrollOn();
            //очистка после закрытия окна
            document.querySelectorAll('.modal').forEach(element => {
                if (!element.classList.contains('modal__visible')) {
                    document.querySelectorAll('.modal__field').forEach(item => {
                        item.value = '';
                        item.style.border = '';
                        let errors = element.querySelectorAll('.modal__error');
                        errors.forEach(element => element.remove());
                    })
                }
            })
        })
    })

    const modalsInner = document.querySelectorAll('.modal__inner');
    modalsInner.forEach(element => {
        element.addEventListener('click', event => event.stopPropagation());                                //Для клика внутри
    });
    document.querySelector('.profile__inner').addEventListener('click', event => event.stopPropagation());

    //Кнопки открытия внутри
    const modalAccount = document.querySelectorAll('.modal__account');
    modalAccount.forEach((element) => {
        element.addEventListener('click', function () {

            const modals = document.querySelectorAll('.modal');
            modals.forEach((item) => {
                item.classList.remove('modal__visible');
            })

            const id = this.dataset.modalAccount;
            const modal = document.querySelector('#modal-' + id);
            modal.classList.add('modal__visible');
        })
    })
})();

//Cлайдер
; (function () {
    const slider = document.querySelector('.slider__inner');
    const back = document.querySelector('.slider__left');
    const next = document.querySelector('.slider__right');

    let media = window.matchMedia('(max-width: 768px)');

    back.addEventListener('click', backSlide);
    next.addEventListener('click', nextSlide);

    let sliderCount = 0;

    function nextSlide() {
        sliderCount++;
        if (media.matches) {
            if (sliderCount >= 5) {
                sliderCount = 4;
            }
        } else {
            if (sliderCount >= 3) sliderCount = 2;
        }

        if (sliderCount == 4) {
            next.classList.add('slider__vector--deactive');
            back.classList.remove('slider__vector--deactive');
        } else if (sliderCount == 0) {
            back.classList.add('slider__vector--deactive');
            next.classList.remove('slider__vector--deactive');
        }

        rollSlider();
        activeSlide(sliderCount);
    }

    function backSlide() {
        sliderCount--;
        if (sliderCount < 0) sliderCount = 0;

        if (sliderCount == 4) {
            next.classList.add('slider__vector--deactive');
            back.classList.remove('slider__vector--deactive');
        } else if (sliderCount == 0) {
            back.classList.add('slider__vector--deactive');
            next.classList.remove('slider__vector--deactive');
        }

        rollSlider();
        activeSlide(sliderCount);
    }

    function rollSlider() {
        if (media.matches) {
            slider.style.left = -sliderCount + '00' + '%';
        } else {
            slider.style.left = -document.querySelector('.slider__img').offsetWidth * sliderCount + 'px';
        }

        if (sliderCount == 4) {
            next.classList.add('slider__vector--deactive');
            back.classList.remove('slider__vector--deactive');
        } else if (sliderCount == 0) {
            back.classList.add('slider__vector--deactive');
            next.classList.remove('slider__vector--deactive');
        } else {
            next.classList.remove('slider__vector--deactive');
            back.classList.remove('slider__vector--deactive');
        }
    }

    const switchItems = document.querySelectorAll('.slider__switch-item');
    function activeSlide(index) {
        switchItems.forEach(element => {
            element.classList.remove('slider__switch-item--active')
            element.closest('.slider__switch-inner').classList.remove('slider__switch-inner--active');
        });
        switchItems[index].classList.add('slider__switch-item--active');
        switchItems[index].closest('.slider__switch-inner').classList.add('slider__switch-inner--active');
    }

    document.querySelectorAll('.slider__switch-inner').forEach((elements, index) => {
        elements.addEventListener('click', function () {
            sliderCount = index;

            rollSlider();
            activeSlide(sliderCount);
        })
    })
})();



let errorCardNumber = document.createElement('span');
let errorExpiration = document.createElement('span');
let errorCvc = document.createElement('span');
let errorCardHolder = document.createElement('span');
let errorPostal = document.createElement('span');
let errorCity = document.createElement('span');

//Добавление кНИГ localStorage, открытие модального окна
; (function () {
    const btnBuy = document.querySelectorAll('.book__button');
    const modalBuy = document.querySelector('.buy');

    if (localStorage.getItem('user') && userDataObject['active'] == 'true') {
        btnBuy.forEach(element => userDataObject['buttons'].forEach(num => {
            if (element.dataset.btn == num) {                                              //При обновлении
                element.classList.add('book__button--deactive');
                element.innerHTML = 'Own';
            }
        }))
    }

    // Добавление кНИГ в профиль при обновлении
    const bookList = document.querySelector('.profile__rented');
    const author = [];
    const bookName = [];
    if (localStorage.getItem('user') && userDataObject['active'] == 'true') {
        userDataObject['books'].forEach(element => {
            for (let i = 0; i < element.length; i++) {
                i % 2 != 0 ? bookName.push(element[i]) : author.push(element[i]);
            }
        })
    }

    btnBuy.forEach(element => {                                                           //Список книг при клике
        element.addEventListener('click', function () {
            const parent = this.closest('.book');
            if (!userDataObject['buttons'].includes(this.dataset.btn) && userDataObject['abonement'] != 'false') { //Если еще не жмакали
                let li = document.createElement('li');
                let span = document.createElement('span');

                const author = parent.dataset.author;
                const bookName = parent.dataset.book;
                li.textContent = bookName + ', ' + author;
                li.classList.add('profile__rented-item');
                document.querySelector('.profile__rented-item--not').style.display = 'none';

                li.prepend(span);
                bookList.prepend(li);
                bookList.classList.add('profile__rented--active');
            }
        })
    })

    if (bookName.length < 1 && author.length < 1) {
        document.querySelector('.profile__rented-item--not').style.display = 'block';
    } else {
        document.querySelector('.profile__rented-item--not').style.display = 'none';
        for (let i = 0; i < bookName.length; i++) {                                           //Список книг при обновлении
            let li = document.createElement('li');
            let span = document.createElement('span');

            li.textContent = bookName[i] + ', ' + author[i];
            li.classList.add('profile__rented-item');
            bookList.classList.add('profile__rented--active');

            bookList.prepend(li);
            li.prepend(span);
            bookList.classList.add('profile__rented--active');
        }
    }


    for (let elem of btnBuy) {
        elem.addEventListener('click', function (event) {
            if (!localStorage.getItem('user') || userDataObject['active'] == 'false') {     //Если не зареганы
                document.getElementById('modal-1').classList.add('modal__visible')
                scroll.scrollOff();
            } else if (userDataObject['abonement'] != 'true') {                             //Если не куплен абонемент
                modalBuy.style.display = 'flex';
                scroll.scrollOff();
            } else {
                if (!userDataObject['buttons'].includes(this.dataset.btn)) {                //если на кнопку еще не жмакали, то добавляем
                    userDataObject['buttons'].push(this.dataset.btn);
                    localStorage.setItem('user', JSON.stringify(userDataObject));

                    this.classList.add('book__button--deactive');                           //добавляем неактивный класс + увеличиваем счетчик
                    this.innerHTML = 'Own';                                                 //чтобы не обновлять
                    document.querySelector('.books__count').innerHTML = parseInt(document.querySelector('.books__count').innerHTML) + 1;
                    document.querySelector('.books__count--find').innerHTML = parseInt(document.querySelector('.books__count--find').innerHTML) + 1;
                }

                const authorAdded = [];
                const bookNameAdded = [];
                for (let arr of userDataObject['books']) {
                    arr.forEach(function (element, index) {
                        index % 2 == 0 ? authorAdded.push(element) : bookNameAdded.push(element);
                    });
                }

                const author = this.closest('.book').dataset.author;
                const bookName = this.closest('.book').dataset.book;

                if (!authorAdded.includes(author) && !bookNameAdded.includes(bookName)) {
                    userDataObject['books'].push([author, bookName]);
                    localStorage.setItem('user', JSON.stringify(userDataObject));
                }
            }
        })
    }
    const inputs = document.querySelectorAll('[data-abonement]');
    document.querySelector('.buy__close').addEventListener('click', function () {
        modalBuy.style.display = 'none';
        inputs.forEach(item => {
            item.value = ''
            item.style.border = '';
            errorCardNumber.remove();
            errorExpiration.remove();
            errorCvc.remove();
            errorCardHolder.remove();
            errorPostal.remove();
            errorCity.remove();
        });
        scroll.scrollOn();
    })

    document.querySelector('.buy').addEventListener('click', function () {              //Закрытие окна по клику вне
        modalBuy.style.display = 'none';
        inputs.forEach(item => {
            item.value = ''
            item.style.border = '';
            errorCardNumber.remove();
            errorExpiration.remove();
            errorCvc.remove();
            errorCardHolder.remove();
            errorPostal.remove();
            errorCity.remove();
        });
        scroll.scrollOn();
    })
    document.querySelector('.buy__inner').addEventListener('click', function (event) {
        event.stopPropagation()
    })
})();



//ТАБЫ
; (function () {
    const tabItem = document.querySelectorAll('.tabs__item');
    const content = document.querySelectorAll('.favorites__content');
    tabItem.forEach(function (element, index) {
        element.addEventListener('click', function () {
            addThisElem(tabItem, 'tabs__item--active', index);
            addThisElem(content, 'favorites__content--active', index);
        })
    })

    function addThisElem(array, className, index) {
        array.forEach(element => element.classList.remove(className));
        array[index].classList.add(className);
    }
})();

//Регистрация пользователя
; (function () {
    const register = document.querySelectorAll('[data-register]');
    const createAccount = document.getElementById('create__account');

    const dataRegister = {};
    const keys = [];
    const values = [];

    //Инпуты
    const first__name = document.getElementById('first__name');
    const last__name = document.getElementById('last__name');
    const email = document.getElementById('register__email');
    const password = document.getElementById('password');

    //Спаны для ошибок
    let spanFirstName = document.createElement('span');
    let spanLastName = document.createElement('span');
    let spanPassword = document.createElement('span');
    let spanEmail = document.createElement('span');

    //Регистрация - имя
    first__name.addEventListener('input', function () {
        if (first__name.value.length > 1) {
            first__name.style.border = '1px solid green';
            spanFirstName.remove();
        } else if (first__name.value.length < 2) {
            first__name.style.border = '1px solid red';
        }
    })

    first__name.addEventListener('blur', function () {
        if (this.value.length == 0) this.style.border = '';
    })


    //Регистрация - фамилия
    last__name.addEventListener('input', function () {
        if (last__name.value.length > 1) {
            last__name.style.border = '1px solid green';
            spanLastName.remove();
        } else if (last__name.value.length < 2) {
            last__name.style.border = '1px solid red';
        }
    })

    last__name.addEventListener('blur', function () {
        if (this.value.length == 0) this.style.border = '';
    })


    //Регистрация - мыло
    email.addEventListener('input', function () {
        if (email.value.match(/\w+@[a-z]{2,}\.[a-z]{2,}/)) {
            email.style.border = '1px solid green';
            spanEmail.remove();
        } else if (!email.value.match(/\w+@[a-z]{2,}\.[a-z]{2,}/)) {
            email.style.border = '1px solid red';
        }
    })

    email.addEventListener('blur', function () {
        if (this.value.length == 0) this.style.border = '';
    })


    //Регистрация - пароль
    password.addEventListener('input', function () {
        if (password.value.length > 7) {
            password.style.border = '1px solid green';
            spanPassword.remove();
        } else if (password.value.length < 7) {
            password.style.border = '1px solid red';
        }
    })

    password.addEventListener('blur', function () {
        if (this.value.length == 0) this.style.border = '';
    })

    createAccount.addEventListener('click', function (event) {
        const errors = {};

        try {
            //Поле регистрации Имя
            if (first__name.value.length < 2) {
                first__name.style.border = '1px solid red';

                spanFirstName.textContent = '* Name cannot be shorter than 2 characters';
                spanFirstName.classList.add('modal__error');
                first__name.insertAdjacentElement('afterEnd', spanFirstName)

                errors['first__name'] = '* Name cannot be shorter than 2 characters';
            }

            //Поле регистрации фамилия

            if (last__name.value.length < 2) {
                last__name.style.border = '1px solid red';
                spanLastName.textContent = '* Last name cannot be shorter than 2 characters';
                spanLastName.classList.add('modal__error');
                last__name.insertAdjacentElement('afterEnd', spanLastName)
                errors['last__name'] = '* last name cannot be shorter than 2 characters';
            }

            //Поле регистрации email
            if (!email.value.match(/\w+@[a-z]{2,}\.[a-z]{2,}/)) {
                email.style.border = '1px solid red';
                spanEmail.textContent = '* Incorrect email';
                spanEmail.classList.add('modal__error');
                email.insertAdjacentElement('afterEnd', spanEmail)
                errors['register__email'] = '* Incorrect email';
            }

            //ПАРОЛЬ
            if (password.value.length < 8) {
                password.style.border = '1px solid red';
                spanPassword.textContent = '* Password cannot be shorter than 8 characters';
                spanPassword.classList.add('modal__error--password');
                spanPassword.classList.add('modal__error');
                password.insertAdjacentElement('afterEnd', spanPassword)
                errors['password'] = '* Password cannot be shorter than 8 characters';
            }


            if (Object.keys(errors).length > 0) {
                event.preventDefault();
            } else {
                for (let elem of register) {
                    keys.push(elem.getAttribute('data-register'));
                    values.push(elem.value);
                }

                for (let i = 0; i < 4; i++) {
                    dataRegister[keys[i]] = values[i];
                }
                dataRegister['card__number'] = cardNumber(getRandomNumber());
                dataRegister['books__count'] = 0;
                dataRegister['visits'] = 1;
                dataRegister['active'] = 'true';  //Статус аккаунта
                dataRegister['abonement'] = 'false';
                dataRegister['books'] = [];
                dataRegister['buttons'] = [];
                dataRegister['authorisation'] = 'true';


                localStorage.setItem('user', JSON.stringify(dataRegister));
                event.preventDefault();
                location.reload();
            }
        } catch (error) {
            if (error.name == 'QuotaExceededError') localStorage.clear();
        }
    })
})();

//Генерация Card Number
function getRandomNumber() {
    return Math.floor(Math.random() * (99999999999 - 10000000000 + 1)) + 10000000000;
}

function cardNumber(number) {
    const EXCEPTIONS = { 10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F' };
    const remainder = [];
    while (number != 0) {
        remainder.push(number % 16);
        number = Math.floor(number / 16);
    }

    const result = [];
    for (let elem of remainder.reverse()) {
        EXCEPTIONS[elem] ? result.push(EXCEPTIONS[elem]) : result.push(elem);
    }
    if (result.length == 10) result.pop();

    return result.join('');
}

//Меняем страницу после регистрации
; (function () {
    if (localStorage.getItem('user') && userDataObject['active'] == 'true') {
        document.querySelector('.user__img').classList.add('user__deactive');      //иконка юзерa, убираем иконку и заменем на символы
        document.querySelector('.user__initials').textContent = userDataObject['firstName'][0].toUpperCase() + userDataObject['lastName'][0].toUpperCase();

        //смена списка
        document.querySelectorAll('[data-user-authorized]').forEach(element => element.classList.remove('user__item--deactive'));
        document.querySelectorAll('[data-user-not-authorized').forEach(element => element.classList.add('user__item--deactive'))

        //количество визитов
        document.querySelector('.visits__count').innerHTML = userDataObject['visits'];
        document.querySelector('.visits__count--find').innerHTML = userDataObject['visits'];

        //Card Number
        document.querySelector('.profile__card-number').innerHTML = userDataObject['card__number'];

        //Инициалы имени
        document.querySelector('.profile__initials').innerHTML = userDataObject['firstName'][0].toUpperCase() + userDataObject['lastName'][0].toUpperCase();
        document.querySelector('.profile__name').innerHTML = userDataObject['firstName'] + ' ' + userDataObject['lastName'];

        //кНИГИ
        document.querySelector('.books__count').innerHTML = userDataObject['books__count'];

        //title при наведении
        document.querySelector('.user__initials-inner').title = userDataObject['firstName'] + ' ' + userDataObject['lastName'];

        //9-код в списке
        document.querySelector('.user__title').innerHTML = userDataObject['card__number'];

        //Количество кНИГ
        document.querySelector('.books__count').innerHTML = userDataObject['books'].length;
        document.querySelector('.books__count--find').innerHTML = userDataObject['books'].length;

        //Digital Library Cards
        document.querySelector('.get-card__description').innerHTML = `With a digital library card you get free access to the
        Library's wide array of digital resources including e-books, databases, educational resources, and more.`

        document.querySelector('.get-card__title').innerHTML = 'Visit your profile';

        document.querySelector('.find__title').innerHTML = 'Your Library card';

        document.querySelector('.find__form-button').style.display = 'none';
        document.querySelector('.find__cards-profile').style.display = 'flex';

        const cardBtn = document.querySelectorAll('.get-card__btn');
        cardBtn.forEach(element => {
            element.dataset.modalButton == 1 || element.dataset.modalButton == 2 ? element.classList.add('get-card__btn--deactive') : element.classList.remove('get-card__btn--deactive');
        })

    } else if (localStorage.getItem('user') && userDataObject['authorisation'] == 'false') {
        document.querySelector('.visits__count--find').innerHTML = userDataObject['visits'];    //Для нижней меню если вышел из ака
        document.querySelector('.books__count--find').innerHTML = userDataObject['books'].length;

    } else {
        document.querySelector('.user__initials-inner').classList.add('user__deactive');   //иконка юзера смена списка
        document.querySelectorAll('[data-user-authorized]').forEach(element => element.classList.add('user__item--deactive'));
        document.querySelectorAll('[data-user-not-authorized').forEach(element => element.classList.remove('user__item--deactive'))
    }
})();

//авторизация учётной записи
; (function () {
    const loginBtn = document.querySelector('[data-login-account]');
    let spanUser = document.createElement('span');
    let spanEmail = document.createElement('span');
    let spanPassword = document.createElement('span');

    const email = document.getElementById('login__email');
    const password = document.getElementById('login__password');

    email.addEventListener('input', function () {
        if (!email.value.match(/\w+@[a-z]{2,}\.[a-z]{2,}/)) {
            this.style.border = '1px solid red'
        } else {
            this.style.border = '1px solid green';
            spanEmail.remove();
        }
    })

    email.addEventListener('blur', function () {
        if (email.value.length == 0) {
            this.style.border = '';
        } else if (!email.value.match(/\w+@[a-z]{2,}\.[a-z]{2,}/)) {
            this.style.border = '1px solid red';
        } else {
            this.style.border = '';
        }
    })

    password.addEventListener('input', function () {
        if (password.value.length < 8) {
            this.style.border = '1px solid red'
        } else {
            this.style.border = '1px solid green';
            spanPassword.remove();
        }
    })

    password.addEventListener('blur', function () {
        if (password.value.length == 0) {
            this.style.border = '';
        } else if (password.value.length < 7) {
            this.style.border = '1px solid red';
        } else {
            this.style.border = '';
        }
    })

    loginBtn.addEventListener('click', function (event) {
        const errors = {};
        if (localStorage.getItem('user')) {
            const localEmail = userDataObject['email'];
            const localPassword = userDataObject['password'];
            const userCardNumber = userDataObject['card__number'];

            if (email.value.length < 1 || !email.value.match(/\w+@[a-z]{2,}\.[a-z]{2,}/)) {
                email.style.border = '1px solid red';
                spanEmail.textContent = '* Incorrect email';
                spanEmail.classList.add('modal__error');
                email.insertAdjacentElement('afterEnd', spanEmail)
                errors['login__incorrect'] = '* Incorrect password';
            } else if (email.value != localEmail && email.value != userCardNumber) {
                email.style.border = '1px solid red';
                spanEmail.textContent = '* Invalid email or Card Number';
                spanEmail.classList.add('modal__error');
                email.insertAdjacentElement('afterEnd', spanEmail);
                errors['login__not-match'] = '* Invalid email or Card Number';
            } else {
                email.style.border = '';
                spanEmail.remove();
            }

            if (password.value.length < 8) {
                password.style.border = '1px solid red';
                spanPassword.textContent = '* Password length cannot be less than 8';
                spanPassword.classList.add('modal__error');
                spanPassword.classList.add('modal__error--password');
                password.insertAdjacentElement('afterEnd', spanPassword);
                errors['password__not-match'] = '* Password length cannot be less than 8';
            } else if (password.value != localPassword) {
                password.style.border = '1px solid red';
                spanPassword.textContent = '* Invalid password';
                spanPassword.classList.add('modal__error');
                spanPassword.classList.add('modal__error--password');
                password.insertAdjacentElement('afterEnd', spanPassword);
                errors['password__incorrect'] = '* Invalid password';
            } else {
                password.style.border = '';
                spanPassword.remove();
            }

            if (Object.keys(errors).length > 0) {
                event.preventDefault();
            } else {
                if ((email.value == localEmail && password.value == localPassword) ||
                    (email.value == userCardNumber && password.value == localPassword)) {
                    userDataObject['active'] = 'true';
                    userDataObject['visits'] = ++userDataObject['visits'];         //увеличиваем количество входов

                    const dataUserInJson = JSON.stringify(userDataObject);         //в формат JSON

                    localStorage.setItem('user', dataUserInJson);
                    location.reload();
                }
            }
        } else {
            if (email.value.length < 1 || !email.value.match(/\w+@[a-z]{2,}\.[a-z]{2,}/)) {
                email.style.border = '1px solid red';
                spanEmail.textContent = '* Incorrect email';
                spanEmail.classList.add('modal__error');
                email.insertAdjacentElement('afterEnd', spanEmail)
                errors['login__length'] = '* The field cannot be empty';
            }
            if (password.value.length < 8) {
                password.style.border = '1px solid red';
                spanPassword.textContent = '* Password length cannot be less than 8';
                spanPassword.classList.add('modal__error');
                spanPassword.classList.add('modal__error--password');
                password.insertAdjacentElement('afterEnd', spanPassword);
                errors['password__not-match'] = '* Password length cannot be less than 8';
            }
            if (email.value.length > 1 && password.value.length >= 8) {
                spanUser.textContent = 'This user does not exist';
                spanUser.classList.add('modal__error');
                spanUser.classList.add('modal__error--password');

                spanPassword.remove();
                spanEmail.remove();

                email.style.border = '';
                password.style.border = '';

                loginBtn.insertAdjacentElement('beforeBegin', spanUser);
                event.preventDefault();
            }
        }
        event.preventDefault();
    })
})();

// Выход из учётной записи  
; (function () {
    document.querySelector('[data-log-out]').addEventListener('click', function () {
        userDataObject['active'] = 'false';
        userDataObject['authorisation'] = 'false';
        const dataUserInJson = JSON.stringify(userDataObject);
        localStorage.setItem('user', dataUserInJson);
        location.reload();
    })
    if (!localStorage.getItem('user') || userDataObject['active'] == 'false') document.querySelector('.user__initials-inner').classList.add('user__deactive');
})();

// покупка абонемента
; (function () {
    //Номер карты
    const cardNumber = document.querySelector('[data-abonement="card number"]');
    const expirationYear = document.getElementById('expiration__year');
    const expirationMonth = document.getElementById('expiration__month');
    const cardHolder = document.getElementById('cardholder');
    const cvc = document.querySelector('[data-abonement="cvc"]');
    const postal = document.getElementById('postal');
    const city = document.getElementById('city');
    cardNumber.addEventListener('input', function () {
        if (!this.value.match(/^[0-9]{4}\s*[0-9]{4}\s*[0-9]{4}\s*[0-9]{4}\s*$/)) {
            this.style.border = '1px solid red'
        } else {
            this.style.border = '1px solid green';
            errorCardNumber.remove();
        }
        if (cardNumber.value.length != 0 && expirationMonth.value.length != 0 && expirationYear.value.length != 0 &&
            cvc.value.length != 0 && cardHolder.value.length != 0 && postal.value.length != 0 && city.value.length != 0) {
            document.querySelector('.buy__button').classList.remove('buy__button--deactive');
            document.querySelector('.buy__button').disabled = false;
        }
    })
    cardNumber.addEventListener('blur', function () {
        if (this.value.length == 0) {
            this.style.border = '';
            errorCardNumber.remove();
        } else if (!this.value.match(/^[0-9]{4}\s*[0-9]{4}\s*[0-9]{4}\s*[0-9]{4}\s*$/)) {
            this.style.border = '1px solid red';
        }
    })
    //Месяц карты
    expirationMonth.addEventListener('input', function () {
        if (!this.value.match(/^[0-9]{2}$/)) {
            this.style.border = '1px solid red'
        } else {
            this.style.border = '1px solid green';
        }
        if (expirationYear.value.match(/^[0-9]{2}$/) && expirationMonth.value.match(/^[0-9]{2}$/)) {
            errorExpiration.remove();
        }
        if (cardNumber.value.length != 0 && expirationMonth.value.length != 0 && expirationYear.value.length != 0 &&
            cvc.value.length != 0 && cardHolder.value.length != 0 && postal.value.length != 0 && city.value.length != 0) {
            document.querySelector('.buy__button').classList.remove('buy__button--deactive');
            document.querySelector('.buy__button').disabled = false;
        }
    })
    expirationMonth.addEventListener('blur', function () {
        if (this.value.length == 0) {
            this.style.border = '';
        } else if (!this.value.match(/^[0-9]{2}$/)) {
            this.style.border = '1px solid red';
        }
        if (this.value.length == 0 && expirationYear.value.length == 0) {
            expirationMonth.style.border = '';
            expirationYear.style.border = '';
            errorExpiration.remove();
        }
    })
    //Год карты
    expirationYear.addEventListener('input', function () {
        if (!this.value.match(/^[0-9]{2}$/)) {
            this.style.border = '1px solid red'
        } else {
            this.style.border = '1px solid green';
        }
        if (expirationYear.value.match(/^[0-9]{2}$/) && expirationMonth.value.match(/^[0-9]{2}$/)) {
            errorExpiration.remove();
        }
        if (cardNumber.value.length != 0 && expirationMonth.value.length != 0 && expirationYear.value.length != 0 &&
            cvc.value.length != 0 && cardHolder.value.length != 0 && postal.value.length != 0 && city.value.length != 0) {
            document.querySelector('.buy__button').classList.remove('buy__button--deactive');
            document.querySelector('.buy__button').disabled = false;
        }
    })
    expirationYear.addEventListener('blur', function () {
        if (this.value.length == 0) {
            this.style.border = '';
        } else if (!this.value.match(/^[0-9]{2}$/)) {
            this.style.border = '1px solid red';
        }
        if (this.value.length == 0 && expirationMonth.value.length == 0) {
            expirationMonth.style.border = '';
            expirationYear.style.border = '';
            errorExpiration.remove();
        }
    })
    //Номер с обратной стороны
    cvc.addEventListener('input', function () {
        if (!this.value.match(/^[0-9]{3}$/)) {
            this.style.border = '1px solid red';
        } else {
            this.style.border = '1px solid green';
            errorCvc.remove();
        }
        if (cardNumber.value.length != 0 && expirationMonth.value.length != 0 && expirationYear.value.length != 0 &&
            cvc.value.length != 0 && cardHolder.value.length != 0 && postal.value.length != 0 && city.value.length != 0) {
            document.querySelector('.buy__button').classList.remove('buy__button--deactive');
            document.querySelector('.buy__button').disabled = false;
        }
    })
    cvc.addEventListener('blur', function () {
        if (this.value.length == 0) {
            this.style.border = '';
            errorCvc.remove();
        } else if (!this.value.match(/^[0-9]{3}$/)) {
            this.style.border = '1px solid red';
        }
    })
    //Имя владельца карты
    cardHolder.addEventListener('input', function () {
        if (!this.value.match(/^[a-zа-яё]{2,}$/i)) {
            this.style.border = '1px solid red';
        } else {
            this.style.border = '1px solid green';
            errorCardHolder.remove();
        }
        if (cardNumber.value.length != 0 && expirationMonth.value.length != 0 && expirationYear.value.length != 0 &&
            cvc.value.length != 0 && cardHolder.value.length != 0 && postal.value.length != 0 && city.value.length != 0) {
            document.querySelector('.buy__button').classList.remove('buy__button--deactive');
            document.querySelector('.buy__button').disabled = false;
        }
    })
    cardHolder.addEventListener('blur', function () {
        if (this.value.length == 0) {
            this.style.border = '';
            errorCardHolder.remove();
        } else if (!this.value.match(/^[a-zа-яё]{2,}$/i)) {
            this.style.border = '1px solid red';
        }
    })
    //Почтовый индекс
    postal.addEventListener('input', function () {
        if (!this.value.match(/^[0-9]{5,6}$/))
            this.style.border = '1px solid red';
        else {
            this.style.border = '1px solid green';
            errorPostal.remove();
        }
        if (cardNumber.value.length != 0 && expirationMonth.value.length != 0 && expirationYear.value.length != 0 &&
            cvc.value.length != 0 && cardHolder.value.length != 0 && postal.value.length != 0 && city.value.length != 0) {
            document.querySelector('.buy__button').classList.remove('buy__button--deactive');
            document.querySelector('.buy__button').disabled = false;
        }
    })
    postal.addEventListener('blur', function () {
        if (this.value.length == 0) {
            this.style.border = '';
            errorPostal.remove();
        } else if (!this.value.match(/^[0-9]{5,6}$/)) {
            this.style.border = '1px solid red';
        }
    })
    //Город
    city.addEventListener('input', function () {
        if (!this.value.match(/^[a-zа-яё]{2,}$/i))
            this.style.border = '1px solid red';
        else {
            this.style.border = '1px solid green';
            errorCity.removeremove
        }
        if (cardNumber.value.length != 0 && expirationMonth.value.length != 0 && expirationYear.value.length != 0 &&
            cvc.value.length != 0 && cardHolder.value.length != 0 && postal.value.length != 0 && city.value.length != 0) {
            document.querySelector('.buy__button').classList.remove('buy__button--deactive');
            document.querySelector('.buy__button').disabled = false;
        }
    })
    city.addEventListener('blur', function () {
        if (this.value.length == 0) {
            this.style.border = '';
            errorCity.remove();
        } else if (!this.value.match(/^[a-zа-яё]{2,}$/i)) {
            this.style.border = '1px solid red';
        }
    })

    document.querySelector('.buy__button').addEventListener('click', function (event) {
        let errors = [];
        //Номер карты
        if (!cardNumber.value.match(/^[0-9]{4}\s*[0-9]{4}\s*[0-9]{4}\s*[0-9]{4}\s*$/)) {
            errors.push('The bank card number must contain 16 digits.');
            errorCardNumber.textContent = 'The bank card number must contain 16 digits'; //Создаём текст ошибки
            errorCardNumber.classList.add('modal__error');
            cardNumber.insertAdjacentElement('afterEnd', errorCardNumber);

            cardNumber.style.border = '1px solid red';
        }
        //Месяц/год карты
        if (!expirationMonth.value.match(/^[0-9]{2}$/) || !expirationYear.value.match(/^[0-9]{2}$/)) {
            errors.push('Expiration code contains 2 fields limited to 2 digits.');
            errorExpiration.textContent = 'Expiration code contains 2 fields limited to 2 digits';
            errorExpiration.classList.add('modal__error');
            expirationYear.insertAdjacentElement('afterEnd', errorExpiration);

            expirationMonth.style.border = '1px solid red';
            expirationYear.style.border = '1px solid red';
        }
        //CVC
        if (!cvc.value.match(/^[0-9]{3}$/)) {
            errors.push('CVC must contain 3 digits');
            errorCvc.textContent = 'CVC must contain 3 digits';
            errorCvc.classList.add('modal__error');
            errorCvc.classList.add('modal__error--password');
            cvc.insertAdjacentElement('afterEnd', errorCvc);

            cvc.style.border = '1px solid red';
        }
        //Имя владельца карты
        if (!cardHolder.value.match(/^[a-zа-яё]{2,}$/i)) {
            errors.push('Name cannot be shorter than 2 characters');
            errorCardHolder.textContent = 'Name cannot be shorter than 2 characters';
            errorCardHolder.classList.add('modal__error');
            cardHolder.insertAdjacentElement('afterEnd', errorCardHolder);

            cardHolder.style.border = '1px solid red';
        }
        //Почтовый индекс
        if (!postal.value.match(/^[0-9]{5,6}$/)) {
            errors.push('Postal code must contain 5-6 digits');
            errorPostal.textContent = 'Postal code must contain 5-6 digits';
            errorPostal.classList.add('modal__error');
            postal.insertAdjacentElement('afterEnd', errorPostal);

            postal.style.border = '1px solid red';
        }

        if (!city.value.match(/^[a-zа-яё]{2,}$/i)) {
            errors.push('This field cannot be shorter than 2 characters');
            errorCity.textContent = 'This field cannot be shorter than 2 characters';
            errorCity.classList.add('modal__error');
            errorCity.classList.add('modal__error--password');
            city.insertAdjacentElement('afterEnd', errorCity);

            city.style.border = '1px solid red';
        }

        if (errors.length > 0) {
            event.preventDefault();
        } else {
            userDataObject['abonement'] = 'true';
            const dataUserInJson = JSON.stringify(userDataObject);         //в формат JSON
            localStorage.setItem('user', dataUserInJson);
            document.querySelector('.buy').style.display = 'none';
            scroll.scrollOn();
        }
    })
})();

//Запретить скролл
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

//Кнопка скопировать текст
; (function () {
    const copy = document.querySelector('.profile__copy');
    copy.addEventListener('click', function () {
        navigator.clipboard.writeText(document.querySelector('.profile__card-number').textContent);
        const tooltip = document.querySelector('.profile__tooltip');
        if (!tooltip.classList.contains('profile__tooltip--active')) {
            tooltip.classList.add('profile__tooltip--active');
            setTimeout(function () {
                tooltip.classList.remove('profile__tooltip--active');
            }, 3000);
        }
    })
}());


//Проверка статистики пользователя
; (function () {
    const btn = document.querySelector('.find__form-button');
    const inputs = document.querySelectorAll('.find__form-input');

    const inputName = document.querySelector('.find__form-input--name');
    const inputCardNumber = document.querySelector('.find__form-input--card-number');

    let error = document.createElement('span');

    btn.addEventListener('click', function () {
        if (localStorage.getItem('user') && userDataObject['active'] == 'false') {           //Если зареган и НЕ авторизирован
            if (inputName.value == userDataObject['firstName'] + ' ' + userDataObject['lastName'] && inputCardNumber.value == userDataObject['card__number']) {
                inputs.forEach(element => element.value = '');
                btn.style.display = 'none';
                document.querySelector('.find__cards-profile').style.display = 'flex';
                error.remove();
                setTimeout(function () {
                    btn.style.display = 'block';
                    document.querySelector('.find__cards-profile').style.display = 'none';
                }, 10000);
            } else if (inputName.value.length == 0) {
                error.classList.add('find__form-error')
                error.textContent = '* Name field cannot be empty';
                document.querySelector('.find__form-inner').insertAdjacentElement('afterEnd', error);
            } else if (inputCardNumber.value.length < 9) {
                error.classList.add('find__form-error')
                error.textContent = '* Incorrect Card Number';
                document.querySelector('.find__form-inner').insertAdjacentElement('afterEnd', error);
            } else {
                error.classList.add('find__form-error')
                error.textContent = '* Invalid card name or number';
                document.querySelector('.find__form-inner').insertAdjacentElement('afterEnd', error);
            }
        } else if (!localStorage.getItem('user')) {
            // error.classList.add('find__form-error')
            // error.textContent = '* Registration required';
            // document.querySelector('.find__form-inner').insertAdjacentElement('afterEnd', error);
        }
    })
}())