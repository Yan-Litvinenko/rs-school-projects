import { garage } from './components/garage/garage';
import { winnersElement } from './components/winners/htmlComponents/winnersElement';
import { winners } from './components/winners/winners';
import './components/winners/winners.css';

class App {
    private root: HTMLElement;

    constructor() {
        this.root = document.getElementById('root')!;
    }

    async start(): Promise<void> {
        const garageElement: HTMLElement = await garage.renderGarage();
        this.root.innerHTML = '';
        this.root.append(garageElement);
    }

    async winners() {
        this.root.innerHTML = '';
        this.root.append(await winnersElement());
        winners.renderWinners();
    }
}

const app = new App();

export { App, app };
