import { home } from './home/home';
import { registration } from './registration/registration';
import { puzzle } from './puzzle/puzzle';
import { gameBoard } from './gameBoard/gameBoard';
import { dataBase } from './DataBase';
import { PuzzleRow } from './puzzle/puzzleRow';
import { PuzzleCell } from './puzzle/puzzleCell';
import { PuzzleLevel } from './puzzle/puzzleLevel';
import { PuzzleLoader } from './puzzle/puzzleLoader';
import { PuzzleSentence } from './puzzle/puzzleSentence';
import { PuzzleResponse } from './puzzle/puzzleResponse';
import { PuzzleSelect } from './puzzle/puzzleSelect';
import './puzzle/puzzle';
import { PuzzleSettings } from './puzzle/puzzleSettings';

class App {
  private root: HTMLElement;

  constructor() {
    this.root = document.getElementById('app')!;
  }

  destroyChild(): void {
    this.root.removeChild(this.root.childNodes[0]);
  }

  start(): void {
    this.root.append(home);
  }

  registration(): void {
    this.destroyChild();
    this.root.append(registration);
  }

  logout(): void {
    dataBase.remove();
    this.destroyChild();
    this.start();
  }

  puzzle(): void {
    this.destroyChild();
    this.root.append(gameBoard());
    puzzle.start();
  }
}

const puzzleSettings = new PuzzleSettings();
const puzzleLevel = new PuzzleLevel();
const puzzleLoader = new PuzzleLoader();
const puzzleResponse = new PuzzleResponse(puzzleLoader.loadCollection(), puzzleLevel.getRound(), puzzleLevel.getRow());
const puzzleSentence = new PuzzleSentence();
const puzzleRow = new PuzzleRow();
const puzzleCell = new PuzzleCell();
const puzzleSelect = new PuzzleSelect();
const app = new App();

export {
  app,
  App,
  puzzleLevel,
  puzzleLoader,
  puzzleRow,
  puzzleSentence,
  puzzleResponse,
  puzzleCell,
  puzzleSelect,
  puzzleSettings,
};
