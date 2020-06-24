import {IObserver} from '../Observer/Observer';

export interface IPageData {
  name: string,
  rootUrl: string
  url: string,
  depth: number
}

export default class Router {
  currentPage: IObserver<IPageData | null>;
  history: History;

  constructor(pageObserver: IObserver<IPageData | null>, history: History) {
    this.currentPage = pageObserver;
    this.history = history;
  }

  attachTo(window: Window) {
    window.addEventListener('popstate', this.onHistoryChange.bind(this));
  }

  initialize(): void {
    if (this.currentPage.value == null) return;
    const firstPage: IPageData = this.currentPage.value;
    this.history.replaceState(firstPage, firstPage.name, firstPage.rootUrl);
    this.updatePage(firstPage);
  }

  changePage(newPage: IPageData): void {
    const currentPage: IPageData | null = this.currentPage.value;
    if (currentPage != null && currentPage.name == newPage.name) {
      return;
    }

    this.history.replaceState(newPage, newPage.name, newPage.url);
    this.updatePage(newPage);
  }

  updatePage(page: IPageData): void {
    this.currentPage.value = page;
  }

  onHistoryChange(event: PopStateEvent): void {
    const newPage: IPageData = event.state as IPageData;
    this.updatePage(newPage);
  }
}
