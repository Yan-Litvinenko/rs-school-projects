class Menu {
    constructor(pathImage) {
        this.pathImage = pathImage;
        this.media = window.matchMedia('(max-width: 768px)');
        this.countVisible = this.media.matches ? 4 : 8;
        this.currentCategory = 'coffee';
        this.HTMLMenuList = document.getElementById('menu-eat');
        this.HTMLSwitchElements = document.querySelectorAll('.switch__item');

        this.media.addEventListener('change', () => this.handleMediaChange());
    }

    async createMenu() {
        this.addEventListeners();
        this.displayCategoryMenu(this.currentCategory);
    }

    addEventListeners() {
        this.HTMLSwitchElements.forEach((label) =>
            label.addEventListener('click', () => this.changeEatMenu(label.dataset.category)),
        );
    }

    async changeEatMenu(category) {
        if (!MENU[category]) {
            console.error(`Category '${category}' does not exist in dataMenu`);
            return;
        }
        this.currentCategory = category;
        this.cleanMenu();
        this.displayCategoryMenu(category);
        this.countVisible = 4;
    }

    displayCategoryMenu(category) {
        this.cleanMenu();

        if (this.media.matches) {
            const length = MENU[category].length;
            const loader = this.createLoader();

            loader.addEventListener('click', () => {
                this.cleanMenu();
                this.countVisible += 4;
                this.displayCategoryMenu(category);
            });

            if (length > this.countVisible) {
                this.HTMLMenuList.append(loader);
                this.HTMLMenuList.classList.add('menu-load');
            } else {
                loader.remove();
                this.HTMLMenuList.classList.remove('menu-load');
            }
        }

        MENU[category].slice(0, this.countVisible).forEach((menuItem) => {
            this.HTMLMenuList.append(
                this.createMenuElement(
                    category,
                    menuItem.image,
                    menuItem.title,
                    menuItem.description,
                    menuItem.price,
                    menuItem.size,
                    menuItem.additives,
                ),
            );
        });
    }

    createMenuElement(category, imageName, eatName, descriptionText, priceText, size, additives) {
        const li = document.createElement('li');
        const picture = this.createImage(category, imageName);
        const content = this.createContent(eatName, descriptionText, priceText);

        li.classList.add('menu-eat__item');
        li.append(picture, ...content);

        li.addEventListener('click', () => {
            new Modal(category, imageName, eatName, descriptionText, priceText, size, additives);
        });
        return li;
    }

    createImage(category, imageName) {
        const picture = document.createElement('picture');
        const sourceAvif = document.createElement('source');
        const sourceWebp = document.createElement('source');
        const image = document.createElement('img');

        picture.classList.add('menu-eat__picture');

        sourceAvif.src = `${this.pathImage}${imageName}.avif`;
        sourceAvif.type = 'image/avif';
        sourceWebp.src = `${this.pathImage}${imageName}.webp`;
        sourceWebp.type = 'image/webp';
        image.src = `${this.pathImage}${imageName}.jpg`;
        image.alt = category;

        picture.append(sourceAvif, sourceWebp, image);

        return picture;
    }

    createContent(eatName, descriptionText, priceText) {
        const title = document.createElement('h3');
        const description = document.createElement('p');
        const price = document.createElement('span');

        title.classList.add('menu-eat__title');
        description.classList.add('menu-eat__description');
        price.classList.add('menu-eat__price');

        title.textContent = eatName;
        description.textContent = descriptionText;
        price.textContent = `$${priceText}`;

        return [title, description, price];
    }

    createLoader() {
        const loader = document.createElement('img');
        loader.classList.add('loader');
        loader.src = this.pathImage + 'loader.svg';
        loader.alt = 'loader';

        return loader;
    }

    cleanMenu() {
        this.HTMLMenuList.innerHTML = '';
    }

    handleMediaChange() {
        this.displayCategoryMenu(this.currentCategory);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const menu = new Menu('assets/images/');
    menu.createMenu();
});
