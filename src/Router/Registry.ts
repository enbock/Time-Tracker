import ListenerAdapter from '../Observer/ListenerAdapter';
import {IObserver} from '../Observer/Observer';
import {IPageData} from './Router';

interface IRegistryPageData {
  page: IPageData,
  sourceUrl: string,
}

export interface IPageDictionary<T> {
  [index: string]: T
}

export default class Registry {
  dictionary: IPageDictionary<IRegistryPageData>;
  adapter: ListenerAdapter<IPageData>;
  observer: IObserver<IPageData>;

  constructor(observer: IObserver<IPageData>, adapter: ListenerAdapter<IPageData>) {
    this.observer = observer;
    this.adapter = adapter;
    this.dictionary = {};

    this.adapter.addListener(this.updatePageData.bind(this));
  }

  getPages(): IPageDictionary<IPageData> {
    const pages: IPageDictionary<IPageData> = {};

    Object.keys(this.dictionary).forEach((pageName: string) => {
      const registeredPage: IRegistryPageData = this.dictionary[pageName];
      const page: IPageData = registeredPage.page;
      pages[page.name] = page;
    });

    return pages;
  }

  registerPage(page: IPageData) {
    const registeredPage: IRegistryPageData = {
      page: page,
      sourceUrl: page.url
    };

    this.updatePageUrlByDepth(registeredPage, this.observer.value.depth, false);
    this.dictionary[page.name] = registeredPage;
  }

  protected updatePageData(newValue: IPageData): void {
    Object.keys(this.dictionary).forEach(
      (pageName: string) => {
        this.updatePageUrlByDepth(this.dictionary[pageName], newValue.depth, newValue.name == pageName);
      }
    );
  }

  protected updatePageUrlByDepth(registeredPage: IRegistryPageData, depth: number, removeDirectory: boolean): void {
    let relativeBack: string = '', index: number = 0, newUrl: string;

    if (removeDirectory) {
      newUrl = registeredPage.sourceUrl.replace(/.*\//, './');
    } else {
      for (index = 0; index < depth; index++) {
        relativeBack += '../';
      }
      newUrl = (relativeBack + registeredPage.sourceUrl).replace('.././', '../');
    }

    registeredPage.page.url = newUrl;
  }
}