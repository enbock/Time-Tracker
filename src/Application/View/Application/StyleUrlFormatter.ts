import {IObserver} from '../../../Observer/Observer';
import {IPageData} from '../../../Router/Router';

export interface IStyleUrlFormatter {
  format(url: string): string;
}

export default class StyleUrlFormatter {
  protected currentPage: IObserver<IPageData | null>;

  constructor(currentPage: IObserver<IPageData | null>) {
    this.currentPage = currentPage;
  }

  format(url: string): string {
    const currentPage: IPageData | null = this.currentPage.value;
    let pathOffset = './';
    if (currentPage != null && currentPage.depth > 0) {
      let index: number;
      pathOffset = '';
      for (index = 0; index < currentPage.depth; index++) {
        pathOffset += '../';
      }
    }

    return pathOffset + 'Style/' + url + '.css';
  }
}
