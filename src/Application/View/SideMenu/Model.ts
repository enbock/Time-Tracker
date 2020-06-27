export interface IMenuDictionary<T> {
  [name: string]: T
}

export default class Model {
  isOpen: boolean;
  translation: IMenuDictionary<string>;
  isActive: IMenuDictionary<boolean>;
  url: IMenuDictionary<string>;
  pageNames: string[];

  constructor() {
    this.isOpen = false;
    this.isActive = {};
    this.url = {};
    this.translation = {};
    this.pageNames = [];
  }
}
