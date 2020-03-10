import Translator from '../../../Language/Translator';
import {IObserver} from '../../../Observer/Observer';
import PageRegistry, {IPageDictionary} from '../../../Router/Registry';
import {IPageData} from '../../../Router/Router';
import Model from './Model';

export default class Presenter {
  menuOpenState: IObserver<boolean>;
  routerObserver: IObserver<IPageData>;
  pageRegistry: PageRegistry;
  translator: IObserver<Translator>;

  constructor(
    menuOpenState: IObserver<boolean>,
    translator: IObserver<Translator>,
    routerObserver: IObserver<IPageData>,
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

    const pages: IPageDictionary<IPageData> = this.pageRegistry.getPages();
    const activePage = this.routerObserver.value.name;
    model.pageNames = Object.keys(pages);

    model.pageNames.forEach(
      (name: string) => {
        const page: IPageData = pages[name];
        (model.isActive as any)[name] = (activePage == page.name);
        (model.url as any)[name] = page.url;
      }
    );

    return model;
  }
}