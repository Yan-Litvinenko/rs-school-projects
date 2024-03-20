class Nonogram {
    DEACTIVE = 0;
    ACTIVE = 1;
    INACTIVE = 2;

    constructor(images, level, size = 5) {
        this.level = level;
        this.size = size;
        this.random = this.getRandomValue(0, images[level].length - 1);
        this.matrix = images[this.level][this.random].image;
        this.columns = Math.floor(this.size / 5);
    }

    setSettings(images, level = this.level, random = null) {
        this.level = level;
        this.random =
            random ?? this.getRandomValue(0, images[level].length - 1);
        this.matrix = images[this.level][this.random].image;
        this.size = this.matrix.length;
        this.columns = Math.floor(this.size / 5);
    }

    winGame(cells) {
        const actualSolution = [];

        cells.forEach((item) => {
            const isCellActive = item.classList.contains('image__cell--active');
            const index = item.getAttribute('index');
            actualSolution[index] = isCellActive ? this.ACTIVE : this.DEACTIVE;
        });

        return `${this.matrix}` === actualSolution.join(',');
    }

    saveGame(cells) {
        const userSelection = [];

        cells.forEach((cell) => {
            const isCellActive = cell.classList.contains('image__cell--active');
            const isCellDeactive = cell.classList.contains(
                'image__cell--deactive',
            );

            userSelection.push(
                isCellActive
                    ? this.ACTIVE
                    : isCellDeactive
                      ? this.INACTIVE
                      : this.DEACTIVE,
            );
        });

        localStorage.setItem(
            'last_game-nonogram',
            JSON.stringify({
                select: userSelection,
                random: this.random,
                level: this.level,
            }),
        );
    }

    loadGame(lastCells, cells) {
        lastCells.select.forEach((x, i) => {
            if (x === 1) cells[i].classList.add('image__cell--active');
            if (x === 2) cells[i].classList.add('image__cell--deactive');
        });
    }

    resetGame(cells) {
        cells.forEach((cell) =>
            cell.classList.remove(
                'image__cell--active',
                'image__cell--deactive',
            ),
        );
    }

    solutionGame() {
        const matrix = [].concat(...this.matrix);

        matrix.forEach((item, index) => {
            const cell = document.querySelector(`[index="${index}"]`);

            if (item) cell.classList.add('image__cell--active');
            else cell.classList.remove('image__cell--active');
        });
    }

    sizeForDisplay() {
        return `${this.size} x ${this.size}`;
    }

    removeElementsBySelector(selector) {
        document.querySelectorAll(selector).forEach((item) => item.remove());
    }

    getRandomValue(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default Nonogram;
