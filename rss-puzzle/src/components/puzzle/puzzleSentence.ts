import { puzzleCell } from '../app';

class PuzzleSentence {
  add(cell: HTMLElement): void {
    const sentence: HTMLElement = document.querySelector('.sentence')!;
    cell.ondragstart = () => puzzleCell.dragStart(cell);
    cell.ondragend = () => puzzleCell.dragEnd(cell);
    sentence?.append(cell);
  }

  clean() {
    const sentence: HTMLElement = document.querySelector('.sentence')!;
    sentence.innerHTML = '';
  }
}

export { PuzzleSentence };
