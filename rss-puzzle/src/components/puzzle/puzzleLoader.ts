import { ICollection } from '../../interfaces/interfaces';
import { puzzleLevel } from '../app';
import './puzzleLevel';

class PuzzleLoader {
  img: string;

  audio: string;

  collection: ICollection;

  constructor() {
    this.collection = {} as ICollection;
    this.img = '';
    this.audio = '';
    this.loadCollection();
  }

  async loadCollection(): Promise<ICollection> {
    const level: number = puzzleLevel.getLevel();
    const collecion: Promise<ICollection> = import(
      `../../assets/word-collection/wordCollectionLevel${level}.json`
    ).then((module) => module.default);
    collecion.then((collection) => {
      this.collection = collection;
      this.loadImg().then((img) => {
        this.img = img;
      });
      this.loadAudio().then((audio) => {
        this.audio = audio;
      });
    });
    return collecion;
  }

  async loadImg(): Promise<string> {
    const collection: ICollection = await this.collection;
    const imgSrc: string = collection.rounds[puzzleLevel.getRound()].levelData.imageSrc;

    return (await import(`../../assets/images/${imgSrc}`)).default;
  }

  async loadAudio(): Promise<string> {
    const collection: ICollection = await this.collection;
    const audioSrc: string = collection.rounds[puzzleLevel.getRound()].words[puzzleLevel.getRow()].audioExample;

    return (await import(`../../assets/${audioSrc}`)).default;
  }
}

export { PuzzleLoader };
