import { dataBase } from '../DataBase';
import { puzzleLevel, puzzleLoader } from '../app';

class PuzzleSettings {
  translate: string | boolean;

  image: string | boolean;

  constructor() {
    this.translate = dataBase.get('translate')!;
    this.image = dataBase.get('image')!;
  }

  setTranslate() {
    const translate = document.querySelector('.settings__translate');
    const hintSentence = document.querySelector('.hint-sentence');

    hintSentence?.classList.toggle('hint-sentence--deactive');
    translate?.classList.toggle('settings__deactive');
    this.translate = !this.translate;
    dataBase.add('translate', this.translate);
  }

  updateTranslateSentence() {
    const sentence = document.querySelector('.translate-sentence')!;

    sentence.textContent =
      puzzleLoader.collection.rounds[puzzleLevel.getRound()].words[puzzleLevel.getRow()].textExampleTranslate;
  }

  setBackgroundImage() {
    const cells: HTMLElement[] = Array.from(document.querySelectorAll('.puzzle__item, .sentence__word'))!;

    this.image = !this.image;
    this.setColor();
    dataBase.add('image', this.image);

    const bgImage = this.image ? `url(${puzzleLoader.img})` : '';
    cells.forEach((cell: HTMLElement) => (cell.style.backgroundImage = bgImage));
  }

  setColor() {
    const textColor = this.image ? '#fff' : '#000';
    document.documentElement.style.setProperty('--text-color', textColor);
  }
}

export { PuzzleSettings };
