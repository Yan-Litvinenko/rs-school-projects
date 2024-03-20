class Timer {
    constructor(timePanel, timeModal) {
        this.timePanel = timePanel;
        this.timeModal = timeModal;
        this.milliseconds = 0;
        this.seconds = 0;
        this.minutes = 0;
        this.timer = null;
    }

    run() {
        this.timer = setInterval(() => {
            this.milliseconds++;
            if (this.milliseconds >= 100) {
                this.seconds++;
                this.milliseconds = 0;

                if (this.seconds >= 60) {
                    this.minutes++;
                    this.seconds = 0;
                }
            }
            this.updateTimerDisplay();
        }, 10);
    }

    reset() {
        this.resetTimeDisplay();
        this.setTime(0, 0);
    }

    destroyed() {
        clearInterval(this.timer);
    }

    setTime(seconds, milliseconds) {
        this.seconds = seconds;
        this.milliseconds = milliseconds;
    }

    resetTimeDisplay() {
        this.timePanel.textContent = '00:00';
        this.timeModal.textContent = '00:00';
    }

    updateTimerDisplay() {
        this.timePanel.textContent = `${this.addZero(this.minutes)}:${this.addZero(this.seconds)}`;
        this.timeModal.textContent = `${this.addZero(this.minutes)}:${this.addZero(this.seconds)}`;
    }

    saveTimerData() {
        localStorage.setItem(
            'time_game-nonogram',
            JSON.stringify({
                seconds: this.seconds,
                milliseconds: this.milliseconds,
            }),
        );
    }

    addZero(number) {
        return +number < 10 ? `0${+number}` : number;
    }
}

export default Timer;
