import {ILanguageSetup} from '../../../Language/ChangeLanguageSetup';
import Translator from '../../../Language/Translator';
import {IObserver} from '../../../Observer/Observer';
import PageRegistry, {IPageDictionary} from '../../../Router/Registry';
import {IPageData} from '../../../Router/Router';
import Model from './Model';

export default class Presenter {
  menuOpenState: IObserver<boolean>;
  languageSetupObserver: IObserver<ILanguageSetup>;
  routerObserver: IObserver<IPageData>;
  pageRegistry: PageRegistry;

  constructor(
    menuOpenState: IObserver<boolean>,
    languageSetupObserver: IObserver<ILanguageSetup>,
    routerObserver: IObserver<IPageData>,
    pageRegistry: PageRegistry
  ) {
    this.menuOpenState = menuOpenState;
    this.languageSetupObserver = languageSetupObserver;
    this.routerObserver = routerObserver;
    this.pageRegistry = pageRegistry;
  }

  present(): Model {
    const model: Model = new Model();
    model.isOpen = this.menuOpenState.value;

    const translator: Translator = this.languageSetupObserver.value.translator;
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