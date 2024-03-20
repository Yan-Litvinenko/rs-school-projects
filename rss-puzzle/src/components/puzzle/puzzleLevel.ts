import {
  puzzleCell,
  puzzleLoader,
  puzzleResponse,
  puzzleRow,
  puzzleSelect,
  puzzleSentence,
  puzzleSettings,
} from '../app';
import { puzzle } from './puzzle';
import { ICollection } from '../../interfaces/interfaces';

class PuzzleLevel {
  private level: number;

  private round: number;

  private row: number;

  private maxLevel: number;

  private rounds: number;

  constructor(level = 1, round = 0) {
    this.level = level;
    this.round = round;
    this.row = 0;
    this.maxLevel = 6;
    this.rounds = 0;
  }

  setLevel(level: number): void {
    this.level = level;
    this.round = 0;
    this.selectLevelOrRound(true);
  }

  getLevel(): number {
    return this.level;
  }

  nextLevel() {
    this.level++;
    this.setLevel(this.level);
    puzzleSettings.updateTranslateSentence();
  }

  getMaxLevel() {
    return this.maxLevel;
  }

  setRound(round: number): void {
    this.round = round - 1;
    this.selectLevelOrRound(false);
    puzzleSettings.updateTranslateSentence();
  }

  getRound(): number {
    return this.round;
  }

  nextRound() {
    this.round++;
    this.row = 0;
    puzzle.start();
    puzzleSelect.updateSelectedOption('page', this.round);
    puzzleSettings.updateTranslateSentence();
  }

  setRow(row: number): void {
    this.row = row;
  }

  getRow(): number {
    return this.row;
  }

  nextRow(): void {
    const translateSentence: HTMLElement = document.querySelector('.translate-sentence')!;

    this.row++;
    puzzleResponse.setResponse(puzzleLoader.collection, this.getRound(), this.getRow());
    translateSentence.textContent = puzzleLoader.collection.rounds[this.round].words[this.row].textExampleTranslate;
    puzzle.start();
  }

  setRounds(rounds: number): void {
    this.rounds = rounds;
  }

  getRounds(): number {
    return this.rounds;
  }

  async selectLevelOrRound(isLevel: boolean) {
    await puzzleLoader.loadCollection();

    const collection: ICollection = puzzleLoader.collection;
    const img: string = puzzleLoader.img;

    this.row = 0;
    puzzle.cleanBoard();
    puzzleResponse.setResponse(collection, this.round, this.row);
    puzzleRow.add(this.row);

    if (isLevel) {
      const length: number = collection.rounds.length;

      this.setRounds(length);
      puzzleSelect.updateCreateOption('page', length, this.round);
      puzzleSelect.updateSelectedOption('level', this.level - 1);
    }

    puzzleResponse.getReponse().forEach((item: string, index: number) =>
      puzzleSentence.add(
        puzzleCell.createCell({
          img,
          text: item,
          index,
          indexRow: this.row,
          vectorRow: 'response',
          widthAndBackground: '',
        }),
      ),
    );
    puzzleCell.adjustCellPositions(document.querySelector('.puzzle__inner')!);
  }
}

export { PuzzleLevel };
