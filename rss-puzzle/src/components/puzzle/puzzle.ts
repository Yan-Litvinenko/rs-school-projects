import { ICollection, INewCellProps } from '../../interfaces/interfaces';
import {
  puzzleCell,
  puzzleLevel,
  puzzleLoader,
  puzzleResponse,
  puzzleRow,
  puzzleSelect,
  puzzleSentence,
  puzzleSettings,
} from '../app';
import { createElement } from '../tag';

class Puzzle {
  async start() {
    await puzzleLoader.loadCollection();

    const collection: ICollection = puzzleLoader.collection;
    const collectionLength: number = collection.rounds.length;
    const img: string = puzzleLoader.img;
    const row: number = puzzleLevel.getRow();

    puzzleLevel.setRounds(collectionLength);
    puzzleResponse.setResponse(collection, puzzleLevel.getRound(), puzzleLevel.getRow());
    puzzleSelect.updateCreateOption('page', collectionLength, puzzleLevel.getRound());
    puzzleRow.add(row);
    puzzleSettings.setColor();

    puzzleResponse.getReponse().forEach((item: string, index: number) =>
      puzzleSentence.add(
        puzzleCell.createCell({
          img,
          text: item,
          index,
          indexRow: puzzleLevel.getRow(),
          vectorRow: 'response',
          widthAndBackground: '',
        }),
      ),
    );

    puzzleCell.adjustCellPositions(document.querySelector('.puzzle__inner')!);
  }

  moveWord(props: INewCellProps, destination: 'response' | 'sentence'): void {
    const selector: string = destination === 'response' ? '.sentence' : `[data-row="${props.indexRow}"]`;
    const targetCell: HTMLElement = document.querySelector(
      `[index_cell = "${props.index}"][index_row = "${props.indexRow}"]`,
    )!;
    const row: HTMLElement = document.querySelector(selector)!;

    row.append(
      puzzleCell.createCell({
        img: props.img,
        text: props.text,
        index: props.index,
        indexRow: props.indexRow,
        vectorRow: destination,
        widthAndBackground: puzzleCell.getDynamicCellStyle(targetCell),
      }),
    );

    targetCell?.remove();

    const complete: boolean = puzzleResponse.checkAllWordsEnter();

    if (complete) {
      puzzleResponse.buttonCheckToActive();
    }
  }

  cleanBoard() {
    const puzzleInner: HTMLElement = document.querySelector('.puzzle__inner')!;
    puzzleInner.innerHTML = '';
    puzzleSentence.clean();
  }

  disableUserActionsOn() {
    const overlay = createElement('div', { class: 'disable-action' });
    document.body.append(overlay);
  }

  disableUserActionsOff() {
    const overlay = document.querySelector('.disable-action');
    overlay?.remove();
  }
}

const puzzle = new Puzzle();

export { puzzle, Puzzle };
