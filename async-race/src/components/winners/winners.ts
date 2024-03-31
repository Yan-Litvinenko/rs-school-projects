import { htmlElement } from '../htmlElement';
import { ICar, IWinnersData } from '../interfaces/interfaces';
import { tableCar } from './htmlComponents/tableCar';
import { tableName } from './htmlComponents/tableName';
import { tableNumber } from './htmlComponents/tableNumber';
import { tableTime } from './htmlComponents/tableTime';
import { tableWins } from './htmlComponents/tableWins';

class Winners {
    async getCountWinners(): Promise<number> {
        const request: Response = await fetch('http://localhost:3000/winners', { method: 'GET' });
        const response: IWinnersData[] = await request.json();

        return response.length;
    }

    async renderWinners() {
        const winners = document.querySelector('.table__inner')!;
        const requestWinners: Response = await fetch('http://localhost:3000/winners', {
            method: 'GET',
        });
        const responseWinners: IWinnersData[] = await requestWinners.json();
        const requestGarage: Response = await fetch('http://localhost:3000/garage', {
            method: 'GET',
        });
        const responseGarage: ICar[] = await requestGarage.json();

        responseWinners.forEach((winner: IWinnersData) => {
            winners.append(
                htmlElement({
                    tag: 'div',
                    attributes: {
                        class: 'table__row',
                    },
                    children: [
                        tableNumber(winner.id),
                        tableCar(responseGarage[winner.id].color),
                        tableName(responseGarage[winner.id].name),
                        tableWins(winner.wins),
                        tableTime(winner.time),
                    ],
                }),
            );
        });
    }

    async addWinner(id: string, time: number) {
        const requestWinners: Response = await fetch('http://localhost:3000/winners', {
            method: 'GET',
        });
        const responseWinners: IWinnersData[] = await requestWinners.json();
        const winnerInDb = responseWinners.find((item) => item.id === +id);
        const winner = {
            id: +id,
            time: time,
            wins: 1,
        };

        if (winnerInDb) {
            winner.wins = winnerInDb.wins + 1;

            if (winner.time > winnerInDb.time) {
                winner.time = winnerInDb.time;
            }
        }

        fetch('http://localhost:3000/winners', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(winner),
        }).catch((error) => console.error('При добавлении победителя произошла ошибка:', error));
    }
}

const winners = new Winners();

export { winners };
