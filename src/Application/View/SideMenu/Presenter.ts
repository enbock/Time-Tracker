import PageRegistry from '@enbock/application-router/Registry';
import {PageData} from '@enbock/application-router/Router';
import {Observer} from '@enbock/state-value-observer/ValueObserver';
import Translator from '../../../Language/Translator';
import Model from './Model';

export default class Presenter {
  menuOpenState: Observer<boolean>;
  routerObserver: Observer<PageData | null>;
  pageRegistry: PageRegistry;
  translator: Observer<Translator>;

  constructor(
    menuOpenState: Observer<boolean>,
    translator: Observer<Translator>,
    routerObserver: Observer<PageData | null>,
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

    const pages: PageData[] = this.pageRegistry.getPages();
    const activePage: string = this.routerObserver.value?.name || '';

    model.pageNames = [];
    pages.forEach(
      (page: PageData) => {
        model.pageNames.push(page.name);
        model.isActive[page.name] = (activePage == page.name);
        model.url[page.name] = page.currentUrl;
      }
    );

    return model;
  }
}
