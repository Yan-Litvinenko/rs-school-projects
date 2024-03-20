import { puzzleLevel } from '../app';
import { createElement } from '../tag';

class PuzzleRow {
  targetCell: HTMLElement | null;

  constructor() {
    this.targetCell = null;
  }

  create(index: number) {
    puzzleLevel.setRow(index);

    return createElement('div', {
      class: 'puzzle__row',
      attributes: {
        'data-row': `${index}`,
      },
    });
  }

  add(index: number): void {
    const container: HTMLElement = document.querySelector('.puzzle__inner')!;
    const row: HTMLElement = this.create(index);
    row.ondragover = () => this.dragOver(event);
    row.ondrop = () => this.dragDrop(puzzleLevel.getRow());
    container.append(row);
  }

  dragOver(event: Event | undefined) {
    if (event instanceof MouseEvent) {
      event?.preventDefault();
      this.targetCell = event?.target as HTMLElement;

      const targetRect = this.targetCell?.getBoundingClientRect();
      const targetWidth = targetRect.width;
      const targetLeft = targetRect.left;
      const mouseX = event?.clientX;

      // Определяем середину ячейки
      const cellMiddle = targetLeft + targetWidth / 2;

      // Если курсор левее середины ячейки, считаем, что пользователь хочет вставить слева от ячейки
      if (mouseX < cellMiddle) {
        this.targetCell.classList.add('left-dragged-over');
        this.targetCell.classList.remove('right-dragged-over');
      } else {
        // Если курсор правее середины ячейки, считаем, что пользователь хочет вставить справа от ячейки
        this.targetCell.classList.add('right-dragged-over');
        this.targetCell.classList.remove('left-dragged-over');
      }
    }
  }

  dragDrop(index: number) {
    const parentRow = this.targetCell?.parentNode as HTMLElement;
    const row: HTMLElement = document.querySelector(
      !parentRow.classList.contains('puzzle__row') ? `[data-row="${index}"]` : '.sentence',
    )!;
    const dragCell: HTMLElement = document.querySelector('.dragCell')!;
    // Вставка элемента в зависимости от позиции курсора
    if (this.targetCell !== row) {
      if (this.targetCell?.classList.contains('left-dragged-over')) {
        if (+this.targetCell.getAttribute('index_row')! === index) {
          this.targetCell?.insertAdjacentElement('beforebegin', dragCell);
        }
      } else if (this.targetCell?.classList.contains('right-dragged-over')) {
        if (+this.targetCell.getAttribute('index_row')! === index) {
          this.targetCell?.insertAdjacentElement('afterend', dragCell);
        }
      }
    } else {
      row.append(dragCell);
    }

    // Сброс классов
    this.targetCell?.classList.remove('left-dragged-over');
    this.targetCell?.classList.remove('right-dragged-over');
    dragCell.classList.remove('dragCell');
  }
}

export { PuzzleRow };
