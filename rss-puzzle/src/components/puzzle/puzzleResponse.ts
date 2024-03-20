import { ICollection } from '../../interfaces/interfaces';
import { puzzleLevel, puzzleLoader } from '../app';
import { puzzle } from './puzzle';

class PuzzleResponse {
  response: string[];

  string: string;

  length: number;

  constructor(collection: Promise<ICollection>, page: number, row: number) {
    this.response = [];
    this.string = '';
    this.length = 0;

    collection.then((data) => {
      this.response = data.rounds[page].words[row].textExample.split(' ');
      this.string = this.response.join('');
      this.length = this.response.length;
    });
  }

  setResponse(collection: ICollection, page: number, row: number) {
    this.response = collection.rounds[page].words[row].textExample.split(' ');
    this.string = this.response.join('');
    this.length = this.response.length;
  }

  getReponse(): string[] {
    return this.response;
  }

  buttonCheckToActive(): void {
    // 1
    const button: HTMLElement = document.getElementById('check-continue')!;

    button.classList.remove('control-level__btn--deactive');
    button.onclick = () => this.checkTheSentence(button);
  }

  checkAllWordsEnter(): boolean {
    const response: string[] = this.getReponse();
    const responseCells: HTMLElement[] = Array.from(
      document.querySelectorAll(`[data-row="${puzzleLevel.getRow()}"] .puzzle__item`),
    );

    return responseCells.length === response.length;
  }

  checkTheSentence(button: HTMLElement): void {
    // 2
    const response: string[] = this.getReponse();
    const responseCells: HTMLElement[] = Array.from(
      document.querySelectorAll(`[data-row="${puzzleLevel.getRow()}"] .puzzle__item`),
    );

    responseCells.forEach((cell: HTMLElement, index: number) => {
      if (cell.textContent === response[index]) {
        cell.classList.add('puzzle__item--true');
      } else {
        cell.classList.add('puzzle__item--false');
      }
    });

    const trueRow = this.checkComplete(response, responseCells);

    if (trueRow) {
      this.buttonChangeToContinue(button, responseCells);
    }
  }

  checkComplete(response: string[], responseCells: HTMLElement[]): boolean {
    // 3
    return response.join('') === responseCells.reduce((acc, cell) => acc + cell.textContent, '');
  }

  buttonChangeToContinue(button: HTMLElement, responseCells: HTMLElement[]): void {
    // 4
    button.textContent = 'Continue';
    button.onclick = () => {
      const countRow: number = puzzleLevel.getRow();

      if (countRow >= 9 && puzzleLevel.getRounds() === puzzleLevel.getRound() + 1) {
        puzzleLevel.nextLevel();
        return;
      }

      if (countRow >= 9) {
        puzzleLevel.nextRound();
        puzzle.cleanBoard();
        return;
      }

      puzzleLevel.nextRow();
      responseCells.forEach((item) => item.classList.remove('puzzle__item--true', 'puzzle__item--false'));
      this.buttonChangeToCheck(button);
    };
  }

  buttonChangeToCheck(button: HTMLElement): void {
    // 5
    button.textContent = 'Check';
    button.classList.add('control-level__btn--deactive');
    button.onclick = () => false;
  }

  autocomplete(): void {
    const checkForAutocomplete = this.checkComplete(
      this.response,
      Array.from(document.querySelectorAll('.puzzle__item')),
    );

    if (!checkForAutocomplete) {
      const responseCells = Array.from(
        document.querySelectorAll(`[data-row="${puzzleLevel.getRow()}"] .puzzle__item, .sentence__word`),
      ).sort((a, b) => parseInt(a.getAttribute('index_cell')!) - parseInt(b.getAttribute('index_cell')!));
      const row: HTMLElement = document.querySelector(`[data-row="${puzzleLevel.getRow()}"]`)!;
      const sentence = row.getBoundingClientRect();
      let widthCells = sentence.left;

      responseCells.forEach((item) => {
        if (item instanceof HTMLElement) {
          const itemStyle = item.getBoundingClientRect();
          const verticalOffset = sentence.top - itemStyle.top;
          const horizontalOffset = widthCells - itemStyle.left;

          item.style.transform = `translate(${horizontalOffset}px, ${verticalOffset}px)`;
          widthCells += itemStyle.width;
        }
      });

      this.swapAfterAutoComplete(responseCells);
      puzzle.disableUserActionsOn();
    }
  }

  swapAfterAutoComplete(cells: Element[]): void {
    const sentence: HTMLElement = document.querySelector('.sentence')!;

    setTimeout(() => {
      cells.forEach((cell) => {
        if (cell instanceof HTMLElement) {
          puzzle.moveWord(
            {
              img: puzzleLoader.img,
              text: cell.textContent!,
              index: Number(cell.getAttribute('index_cell')),
              indexRow: Number(cell.getAttribute('index_row')),
            },
            'sentence',
          );
        }
      });
      sentence.innerHTML = '';
      puzzle.disableUserActionsOff();
    }, 1000);
  }

  audioHint() {
    const visual: HTMLElement = document.querySelector('.audio-sentence')!;
    const audio = new Audio(puzzleLoader.audio);
    audio.play();

    visual.textContent = '\u{1F50A}';
    visual.onclick = () => false;

    audio.addEventListener('ended', () => {
      visual.textContent = '\u{1F508}';
      visual.onclick = () => this.audioHint();
    });
  }
}

export { PuzzleResponse };
