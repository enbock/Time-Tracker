import React from 'react';
import LanguageContainer from '../Language/Container';
import ListenerAdapter from '../Observer/ListenerAdapter';
import Observer, {IObserverAdapter} from '../Observer/Observer';
import RouterContainer from '../Router/Container';
import Action from './Action';
import ModuleLoader from './ModuleLoader';
import ApplicationPresenter from './View/Application/Presenter';
import PagePresenter from './View/Page/Presenter';
import SideMenuPresenter from './View/SideMenu/Presenter';
import TopBarPresenter from './View/TopBar/Presenter';

class Container {
  language: typeof LanguageContainer;
  router: typeof RouterContainer;
  applicationPresenter: ApplicationPresenter;
  topAppBarPresenter: TopBarPresenter;
  applicationAction: Action;
  menuOpenStateAdapter: IObserverAdapter<boolean>;
  menuOpenState: Observer<boolean>;
  sideMenuPresenter: SideMenuPresenter;
  moduleStateAdapter: ListenerAdapter<typeof React.Component | null>;
  moduleState: Observer<typeof React.Component | null>;
  moduleLoader: ModuleLoader;
  pagePresenter: PagePresenter;

  constructor() {
    this.language = LanguageContainer;
    this.router = RouterContainer;

    this.menuOpenStateAdapter = {onChange: ((oldValue, newValue) => {})};
    this.menuOpenState = new Observer<boolean>(false, this.menuOpenStateAdapter);

    this.moduleStateAdapter = new ListenerAdapter<typeof React.Component | null>();
    this.moduleState = new Observer<typeof React.Component | null>(null, this.moduleStateAdapter);
    this.moduleLoader = new ModuleLoader('../', this.moduleState);

    this.applicationAction =
      new Action(this.menuOpenState, this.router.router, this.router.registry, this.moduleLoader);
    this.topAppBarPresenter = new TopBarPresenter(this.language.observer);
    this.sideMenuPresenter =
      new SideMenuPresenter(this.menuOpenState, this.language.observer, this.router.observer, this.router.registry);
    this.pagePresenter = new PagePresenter(this.moduleState);
    this.applicationPresenter = new ApplicationPresenter(
      this.language.observer,
      this.topAppBarPresenter,
      this.sideMenuPresenter,
      this.pagePresenter
    );
  }
}

export default new Container();