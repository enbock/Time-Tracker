import {IPageData} from '@enbock/application-router/Router';
import {IObserver} from '@enbock/state-value-observer/Observer';

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
    const depth: number = currentPage != null ? this.calculatePageDepth(currentPage) : 0;

    let pathOffset: string = './';
    if (depth > 0) {
      let index: number;
      pathOffset = '';
      for (index = 0; index < depth; index++) {
        pathOffset += '../';
      }
    }

    return pathOffset + 'Style/' + url + '.css';
  }

  private calculatePageDepth(page: IPageData): number {
    return page.baseUrl.replace(/[^\/]*/g, '').length - 1;
  }
}
