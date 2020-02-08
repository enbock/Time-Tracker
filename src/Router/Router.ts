import {IObserver} from '../Observer/Observer';

export interface IPageData {
  name: string,
  url: string,
  depth: number
}

export default class Router {
  currentPage: IObserver<IPageData>;
  history: History;

  constructor(pageObserver: IObserver<IPageData>, history: History) {
    this.currentPage = pageObserver;
    this.history = history;
  }

  attachTo(window: Window) {
    window.addEventListener('popstate', this.onHistoryChange.bind(this));
  }

  changePage(newPage: IPageData): void {
    const currentPage = this.currentPage.value;
    if (currentPage.name == newPage.name) {
      return;
    }

    this.history.pushState(newPage, newPage.name, newPage.url);

    this.updatePage(newPage);
  }

  updatePage(page: IPageData): void {
    this.currentPage.value = page;
  }

  onHistoryChange(event: PopStateEvent) {
    const newPage: IPageData = event.state as IPageData;
    this.updatePage(newPage);
  }
}