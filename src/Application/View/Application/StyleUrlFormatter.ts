import {IObserver} from '../../../Observer/Observer';
import {IPageData} from '../../../Router/Router';

export interface IStyleUrlFormatter {
  format(url: string): string;
}

export default class StyleUrlFormatter {
  protected currentPage: IObserver<IPageData>;

  constructor(currentPage: IObserver<IPageData>) {
    this.currentPage = currentPage;
  }

  format(url: string): string {
    const currentPage: IPageData = this.currentPage.value;
    let pathOffset = './';
    if(currentPage.depth > 0) {
      let index:number;
      pathOffset = '';
      for(index = 0; index < currentPage.depth; index++) {
        pathOffset += '../';
      }
    }

    return pathOffset + 'Style/' + url + '.css';
  }
}
