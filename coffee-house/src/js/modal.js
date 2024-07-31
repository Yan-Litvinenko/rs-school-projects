class Modal {
    constructor(category, imageName, eatName, descriptionText, priceText, size, additives) {
        this.pathImage = 'assets/images/';
        this.category = category;
        this.imageName = imageName;
        this.eatName = eatName;
        this.descriptionText = descriptionText;
        this.price = priceText;
        this.size = size;
        this.additives = additives;
        this.body = document.body;

        this.createModal();
    }

    createModal() {
        const modalElement = document.createElement('div');
        const modalInner = document.createElement('div');
        const content = document.createElement('div');
        const additivesTitle = document.createElement('h4');
        const sizeTitle = document.createElement('h4');

        const textContent = this.createTextContent();
        const sizeElement = this.createSize();
        const additivesElement = this.createAdditives();
        const picture = this.createImage();
        const warning = this.createWarning();
        const closeBtn = this.createCloseBtn();

        additivesTitle.textContent = 'additives';
        sizeTitle.textContent = 'size';

        additivesTitle.classList.add('additives-title');
        content.classList.add('modal__content');
        modalElement.classList.add('modal');
        modalInner.classList.add('modal__inner');
        sizeTitle.classList.add('size-title');

        content.append(
            textContent.title,
            textContent.description,
            sizeTitle,
            sizeElement,
            additivesTitle,
            additivesElement,
            textContent.totalTitle,
            warning,
            closeBtn,
        );

        modalInner.append(picture, content);
        modalElement.append(modalInner);
        modalElement.addEventListener('mousedown', (event) => this.closeModal(event));

        this.body.append(modalElement);
        this.scrollOff();
    }

    createSize() {
        const sizeElement = document.createElement('div');
        const sizes = ['M', 'L', 'S'];

        sizeElement.classList.add('size');

        this.size.forEach((item, index) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            const customInput = document.createElement('div');
            const infoSize = document.createElement('div');

            if (index === 0) {
                input.setAttribute('checked', true);
            }

            label.setAttribute('for', sizes[index]);
            input.setAttribute('id', sizes[index]);
            input.setAttribute('extra-price', index * 0.5);
            input.setAttribute('type', 'radio');
            input.setAttribute('name', 'size');

            label.classList.add('size__label');
            input.classList.add('size__input');
            customInput.classList.add('size__custom-input');
            infoSize.classList.add('size__info');

            customInput.textContent = sizes[index];
            infoSize.textContent = item;

            label.append(input, customInput, infoSize);
            sizeElement.append(label);

            label.addEventListener('click', () => this.setTotalPrice(this.price));
        });

        return sizeElement;
    }

    createAdditives() {
        const additivesElement = document.createElement('div');

        additivesElement.classList.add('additives');

        this.additives.forEach((item, index) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            const customInput = document.createElement('div');
            const infoAdditives = document.createElement('div');

            label.setAttribute('for', index + 1);
            input.setAttribute('id', index + 1);
            input.setAttribute('type', 'checkbox');
            input.setAttribute('extra-price', 1);

            label.classList.add('additives__label');
            input.classList.add('additives__input');
            customInput.classList.add('additives__custom-input');
            infoAdditives.classList.add('additives__info');

            customInput.textContent = index + 1;
            infoAdditives.textContent = item;

            label.append(input, customInput, infoAdditives);
            additivesElement.append(label);

            label.addEventListener('click', () => this.setTotalPrice(this.price));
        });

        return additivesElement;
    }

    createImage() {
        const picture = document.createElement('picture');
        const sourceAvif = document.createElement('source');
        const sourceWebp = document.createElement('source');
        const image = document.createElement('img');

        picture.classList.add('modal__picture');

        sourceAvif.src = `${this.pathImage}${this.imageName}.avif`;
        sourceWebp.src = `${this.pathImage}${this.imageName}.webp`;
        image.src = `${this.pathImage}${this.imageName}.jpg`;
        image.alt = this.category;

        picture.append(sourceAvif, sourceWebp, image);

        return picture;
    }

    createTextContent() {
        const title = document.createElement('h3');
        title.classList.add('modal__title');
        title.textContent = this.eatName;

        const description = document.createElement('p');
        description.classList.add('modal__description');
        description.textContent = this.descriptionText;

        const totalTitle = document.createElement('h3');
        const totalPrice = document.createElement('span');

        totalTitle.classList.add('total');

        totalTitle.textContent = 'Total:';
        totalPrice.textContent = `$${this.price}`;

        totalTitle.append(totalPrice);

        return { title, description, totalTitle };
    }

    createWarning() {
        const warning = document.createElement('div');
        const warningImg = document.createElement('img');
        const warningText = document.createElement('p');

        warning.classList.add('warning');
        warningImg.classList.add('warning__img');
        warningText.classList.add('warning__text');

        warningText.textContent =
            'The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.';
        warningImg.src = 'assets/images/warning.svg';
        warningImg.alt = 'warning';

        warning.append(warningImg, warningText);

        return warning;
    }

    createCloseBtn() {
        const close = document.createElement('button');
        close.setAttribute('type', 'button');
        close.classList.add('close');
        close.textContent = 'close';

        close.addEventListener('click', this.closeModal);

        return close;
    }

    closeModal(event) {
        const modal = document.querySelector('.modal');
        const modalInner = document.querySelector('.modal__inner');
        const target = event.target;

        if (target.className === 'modal' || target.className === 'close') {
            modalInner.style.transform = 'translateY(-200px)';
            modalInner.style.opacity = '0';
            modal.style.backgroundColor = 'transparent';

            setTimeout(() => {
                this.scrollOn();
                modal.remove();
            }, 200);
        }
    }

    setTotalPrice(initPrice) {
        const totalTitle = document.querySelector('.total span');

        let extraPriceSize = 0;
        let extraPriceAdditives = 0;

        document.querySelectorAll('.size__input').forEach((item) => {
            if (item.checked) {
                extraPriceSize = item.getAttribute('extra-price');
            }
        });

        document.querySelectorAll('.additives__input').forEach((item) => {
            if (item.checked) {
                extraPriceAdditives += Number(item.getAttribute('extra-price'));
            }
        });

        const totalPrice = (Number(extraPriceSize) + Number(extraPriceAdditives) + Number(initPrice)).toFixed(2);

        totalTitle.textContent = `$${totalPrice}`;
    }

    scrollOn() {
        document.body.style.cssText = ``;
        document.documentElement.style.scrollBehavior = '';
    }

    scrollOff() {
        scroll.position = window.scrollY;
        document.body.style.cssText = `
            overflow: hidden;
            padding-right: ${window.innerWidth - document.body.offsetWidth}px;
            height: 100vh;
            width: 100vw;
            `;
        document.documentElement.style.scrollBehavior = 'unset';
    }
}
