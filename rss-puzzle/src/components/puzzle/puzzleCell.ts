import { puzzle } from './puzzle';
import { createElement } from '../tag';
import { puzzleLevel, puzzleResponse, puzzleSettings } from '../app';
import { CreateCellArgs } from '../../interfaces/interfaces';

class PuzzleCell {
  createCell({ img, text, index, indexRow, vectorRow, widthAndBackground }: CreateCellArgs): HTMLElement {
    const isResponse: boolean = vectorRow === 'response';
    const cellClass: string = isResponse ? 'sentence__word' : 'puzzle__item';
    const props = this.createAttributes(img, index, indexRow, widthAndBackground);

    return createElement('div', {
      class: cellClass,
      textContent: text,
      ...props,
      onclick: () => puzzle.moveWord({ img, text, index, indexRow }, isResponse ? 'sentence' : 'response'),
    });
  }

  createAttributes(img: string, index: number, indexRow: number, widthAndBackground: string) {
    const bgImage = puzzleSettings.image ? img : '';
    return {
      attributes: {
        style: `background-image: url(${bgImage}); ${widthAndBackground}`,
        index_cell: `${index}`,
        index_row: `${indexRow}`,
        draggable: 'true',
      },
    };
  }

  adjustCellPositions(container: HTMLElement): void {
    const cells: NodeListOf<HTMLElement> = document.querySelectorAll('.sentence__word');
    const widthContainer: number = container.offsetWidth;
    let totalCellWidth: number = 0;

    cells.forEach((cell: HTMLElement) => (totalCellWidth += cell.getBoundingClientRect().width));

    const extraWidth: number = Number(
      ((widthContainer - totalCellWidth) / puzzleResponse.getReponse().length).toFixed(2),
    );

    this.adjustCellBackgroundPosition(widthContainer, cells, extraWidth);
  }

  adjustCellBackgroundPosition(widthContainer: number, cells: NodeListOf<HTMLElement>, extraWidth: number) {
    let cellBgPosition: number = 0;

    cells.forEach((cell: HTMLElement) => {
      const widthStyleCss: number = cell.getBoundingClientRect().width + extraWidth;

      cellBgPosition += widthStyleCss;

      Object.assign(cell.style, {
        width: `${widthStyleCss}px`,
        backgroundPosition: `${this.percentage(cellBgPosition, widthContainer)}% ${puzzleLevel.getRow() * 10}% `,
      });
    });

    this.shuffle(cells);
  }

  percentage(value: number, total: number): number {
    return (value / total) * 100;
  }

  getDynamicCellStyle(cell: HTMLElement) {
    const styles: string[] = [];
    const computedStyle: CSSStyleDeclaration = window.getComputedStyle(cell);
    const backgroundPosition: string = computedStyle.getPropertyValue('background-position');
    const width: string = computedStyle.getPropertyValue('width');

    styles.push(`background-position: ${backgroundPosition};`);
    styles.push(`width: ${width};`);

    return styles.join(' ');
  }

  shuffle(cells: NodeListOf<HTMLElement>) {
    const sentece: HTMLElement = document.querySelector('.sentence')!;
    const cellsArray: HTMLElement[] = Array.from(cells);
    sentece.innerHTML = '';

    for (let i = cellsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      [cellsArray[i], cellsArray[j]] = [cellsArray[j], cellsArray[i]];
    }

    cellsArray.forEach((cell) => sentece.append(cell));
  }

  dragStart(cell: HTMLElement) {
    setTimeout(() => cell.classList.add('hide', 'dragCell'), 0);
  }

  dragEnd(cell: HTMLElement) {
    cell.classList.remove('hide');
  }
}

export { PuzzleCell };
