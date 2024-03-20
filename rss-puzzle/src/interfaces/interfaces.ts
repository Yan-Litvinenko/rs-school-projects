interface DomElementOptions {
  class: string | string[];
  attributes?: Record<string, string>;
  textContent?: string;
  onclick?: () => void;
}

interface INewCellProps {
  img: string;
  text: string;
  index: number;
  indexRow: number;
}

type CreateCellArgs = {
  img: string;
  text: string;
  index: number;
  indexRow: number;
  vectorRow: 'response' | 'sentence';
  widthAndBackground: string;
};

interface ICollection {
  default: IDefault;
  rounds: IRound[];
  roundsCount: number;
}

interface IDefault {
  rounds: IRound[];
  roundsCount: number;
}

interface IRound {
  levelData: IlevelData;
  words: IWords[];
}

interface IlevelData {
  author: string;
  cutSrc: string;
  id: string;
  imageSrc: string;
  name: string;
  year: string;
}

interface IWords {
  audioExample: string;
  id: number;
  textExample: string;
  textExampleTranslate: string;
  word: string;
  wordTranslate: string;
}

export { DomElementOptions, ICollection, IDefault, IRound, IWords, IlevelData, INewCellProps, CreateCellArgs };
