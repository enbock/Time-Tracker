import {PageData} from '@enbock/application-router/Router';
import {Observer} from '@enbock/state-value-observer/ValueObserver';

export default class StyleUrlFormatter {
  protected currentPage: Observer<PageData | null>;

  constructor(currentPage: Observer<PageData | null>) {
    this.currentPage = currentPage;
  }

  format(url: string): string {
    const currentPage: PageData | null = this.currentPage.value;
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

  private calculatePageDepth(page: PageData): number {
    return page.baseUrl.replace(/[^\/]*/g, '').length - 1;
  }
}
