interface IHtmlElement {
    tag: string;
    attributes?: Record<string, string | string[]>;
    children?: HTMLElement | HTMLElement[] | SVGSVGElement[] | SVGSVGElement;
}

interface ICar {
    name: string;
    color: string;
    id: number;
}

interface IEngineData {
    distance: number;
    velocity: number;
}

interface IWinnersData {
    id: number;
    time: number;
    wins: number;
}

interface IRace {
    status: boolean;
    carCount: number;
    carCountInRace: number;
    winner: null | number;
}

export { IHtmlElement, ICar, IEngineData, IWinnersData, IRace };
