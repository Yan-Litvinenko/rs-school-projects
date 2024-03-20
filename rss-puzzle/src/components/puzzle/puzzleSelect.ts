import { puzzleLevel } from '../app';
import { createElement } from '../tag';

class PuzzleSelect {
  selectLevel: number;

  selectPage: number;

  constructor() {
    this.selectLevel = puzzleLevel.getLevel();
    this.selectPage = puzzleLevel.getRound();
  }

  createSelect(id: string, onchange: () => void): HTMLSelectElement {
    const count: number = id === 'level' ? puzzleLevel.getMaxLevel() : puzzleLevel.getRounds();
    const select: HTMLSelectElement = createElement('select', {
      class: 'set-level__select',
      attributes: { id: id },
    }) as HTMLSelectElement;

    select.onchange = onchange;

    this.createOption(select, count, id);

    return select;
  }

  createOption(select: HTMLSelectElement, count: number, id: string): void {
    const selected: number = id === 'level' ? puzzleLevel.getLevel() : puzzleLevel.getRounds();

    for (let i = 1; i <= count; i++) {
      const option: HTMLOptionElement = createElement('option', {
        class: 'set-level__option',
        attributes: {
          value: `${i}`,
        },
        textContent: `${i}`,
      }) as HTMLOptionElement;

      if (selected === i) option.setAttribute('selected', 'selected');
      select.append(option);
    }
  }

  updateCreateOption(select: string, count: number, selected: number): void {
    const selectElement: HTMLSelectElement = document.getElementById(select) as HTMLSelectElement;

    selectElement.innerHTML = '';

    for (let i = 1; i <= count; i++) {
      const option: HTMLOptionElement = createElement('option', {
        class: 'set-level__option',
        attributes: {
          value: `${i}`,
        },
        textContent: `${i}`,
      }) as HTMLOptionElement;

      if (selected + 1 === i) option.setAttribute('selected', 'selected');
      selectElement.append(option);
    }
  }

  updateSelectedOption(select: 'level' | 'page', i: number) {
    const options: NodeListOf<Element> = document.querySelectorAll(`#${select} option`);

    options.forEach((item, index) => {
      if (index === i) {
        item.setAttribute('selected', 'selected');
      } else {
        item.removeAttribute('selected');
      }
    });
  }
}

export { PuzzleSelect };
