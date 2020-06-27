import PageRegistry from '@enbock/application-router/Registry';
import {IPageData} from '@enbock/application-router/Router';
import {IObserver} from '@enbock/state-value-observer/Observer';
import Translator from '../../../Language/Translator';
import Model from './Model';

export default class Presenter {
  menuOpenState: IObserver<boolean>;
  routerObserver: IObserver<IPageData | null>;
  pageRegistry: PageRegistry;
  translator: IObserver<Translator>;

  constructor(
    menuOpenState: IObserver<boolean>,
    translator: IObserver<Translator>,
    routerObserver: IObserver<IPageData | null>,
    pageRegistry: PageRegistry
  ) {
    this.translator = translator;
    this.menuOpenState = menuOpenState;
    this.routerObserver = routerObserver;
    this.pageRegistry = pageRegistry;
  }

  present(): Model {
    const model: Model = new Model();
    model.isOpen = this.menuOpenState.value;

    const translator: Translator = this.translator.value;
    model.translation = {
      home: translator.translate('Application.SideMenu.Home'),
      settings: translator.translate('Application.SideMenu.Settings')
    };

    const pages: IPageData[] = this.pageRegistry.getPages();
    const activePage: string = this.routerObserver.value?.name || '';

    model.pageNames = [];
    pages.forEach(
      (page: IPageData) => {
        model.pageNames.push(page.name);
        model.isActive[page.name] = (activePage == page.name);
        model.url[page.name] = page.currentUrl;
      }
    );

    return model;
  }
}
