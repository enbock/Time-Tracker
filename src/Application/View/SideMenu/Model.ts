export interface MenuDictionary<T> {
  [name: string]: T
}

export default class Model {
  isOpen: boolean;
  translation: MenuDictionary<string>;
  isActive: MenuDictionary<boolean>;
  url: MenuDictionary<string>;
  pageNames: string[];

  constructor() {
    this.isOpen = false;
    this.isActive = {};
    this.url = {};
    this.translation = {};
    this.pageNames = [];
  }
}
