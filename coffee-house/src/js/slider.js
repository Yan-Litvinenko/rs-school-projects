class Slider {
    constructor() {
        this.sliderElement = document.getElementById('slider');
        this.sliderItems = document.querySelectorAll('.slider__item-inner');
        this.vectorLeft = document.querySelector('.slider__vector--left');
        this.vectorRight = document.querySelector('.slider__vector--right');
        this.paginationItems = document.querySelectorAll('.pagination__item');
        this.paginationProgresses = document.querySelectorAll('.pagination__progress');

        this.slideIndex = 0;
        this.progressWidth = 0;
        this.autoInterval = null;
        this.xDown = null;
        this.yDown = null;

        this.init();
    }

    init() {
        this.updateSlider();
        this.autoInterval = setInterval(() => this.autoSlide(), 40);

        this.vectorLeft.addEventListener('click', () => this.prevSlide());
        this.vectorRight.addEventListener('click', () => this.nextSlide());
        this.sliderElement.addEventListener('touchstart', (event) => this.handleTouchStart(event));
        this.sliderElement.addEventListener('touchmove', (event) => this.handleTouchMove(event));

        this.sliderItems.forEach((item) => {
            if (window.matchMedia('(max-width: 768px)').matches) {
                item.addEventListener('touchstart', () => this.pauseAutoSlide());
                item.addEventListener('touchend', () => this.continueAutoSlide());
            } else {
                item.addEventListener('mouseover', () => this.pauseAutoSlide());
                item.addEventListener('mouseout', () => this.continueAutoSlide());
            }
        });
    }

    updateSlider() {
        this.paginationItems.forEach((item) => {
            item.classList.remove('pagination__item--active');
        });
        this.paginationProgresses.forEach((progress) => {
            progress.style.width = '0%';
        });

        this.paginationItems[this.slideIndex].classList.add('pagination__item--active');
        this.sliderElement.style.transform = `translateX(-${this.slideIndex * 100}%)`;
        this.progressWidth = 0;
    }

    nextSlide() {
        this.slideIndex = (this.slideIndex + 1) % 3;
        this.updateSlider();
    }

    prevSlide() {
        this.slideIndex = (this.slideIndex - 1 + 3) % 3;
        this.updateSlider();
    }

    autoSlide() {
        const currentProgress = this.paginationProgresses[this.slideIndex];

        currentProgress.style.width = `${this.progressWidth}%`;
        this.progressWidth += 1;

        if (this.progressWidth > 100) {
            currentProgress.style.width = '0%';
            this.nextSlide();
        }
    }

    handleTouchStart(event) {
        this.xDown = event.touches[0].clientX;
        this.yDown = event.touches[0].clientY;
    }

    handleTouchMove(event) {
        if (!this.xDown || !this.yDown) return;

        const xUp = event.touches[0].clientX;
        const yUp = event.touches[0].clientY;
        const xDiff = this.xDown - xUp;
        const yDiff = this.yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) this.nextSlide();
            else this.prevSlide();
        }

        this.xDown = null;
        this.yDown = null;
    }

    pauseAutoSlide() {
        clearInterval(this.autoInterval);
    }

    continueAutoSlide() {
        this.autoInterval = setInterval(() => this.autoSlide(), 40);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Slider();
});
