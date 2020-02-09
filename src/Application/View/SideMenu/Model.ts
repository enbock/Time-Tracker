export interface IPages<T> {
  home: T;
  settings: T;
}

export default class Model {
  isOpen: boolean;
  translation: IPages<string>;
  isActive: IPages<boolean>;
  url: IPages<string>;
  pageNames: string[];

  constructor() {
    this.isOpen = false;
    this.isActive = {
      home: false,
      settings: false
    };
    this.url = {
      home: '',
      settings: ''
    };
    this.translation = {
      home: '',
      settings: ''
    };
    this.pageNames = [];
  }
}