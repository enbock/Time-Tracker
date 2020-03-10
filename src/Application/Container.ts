import React from 'react';
import LanguageContainer from '../Language/Container';
import ListenerAdapter from '../Observer/ListenerAdapter';
import Observer, {IObserverAdapter} from '../Observer/Observer';
import RouterContainer from '../Router/Container';
import DataStorage from '../Storage/DataStorage';
import Action from './Action';
import {IAdapter, IModulePageData} from './Application';
import ModuleLoader from './ModuleLoader';
import ApplicationPresenter from './View/Application/Presenter';
import PagePresenter from './View/Page/Presenter';
import SideMenuPresenter from './View/SideMenu/Presenter';
import TopBarPresenter from './View/TopBar/Presenter';

class Container {
  language: typeof LanguageContainer;
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
  applicationActionAdapter: IAdapter;
  storage: DataStorage;

  constructor() {
    this.storage = new DataStorage('application', window.localStorage);
    this.language = LanguageContainer;

    this.menuOpenStateAdapter = {onChange: ((oldValue, newValue) => {})};
    this.menuOpenState = new Observer<boolean>(
      this.storage.loadData<boolean>('menuOpenState', false),
      this.storage.attach<boolean>('menuOpenState', this.menuOpenStateAdapter)
    );

    this.moduleStateAdapter = new ListenerAdapter<typeof React.Component | null>();
    this.moduleState = new Observer<typeof React.Component | null>(null, this.moduleStateAdapter);
    this.moduleLoader = new ModuleLoader('../', this.moduleState);

    this.applicationAction =
      new Action(this.menuOpenState, RouterContainer.router, RouterContainer.registry, this.moduleLoader);
    this.applicationActionAdapter = this.applicationAction.adapter;

    this.topAppBarPresenter = new TopBarPresenter(this.language.activeTranslator);
    this.sideMenuPresenter = new SideMenuPresenter(
      this.menuOpenState,
      this.language.activeTranslator,
      RouterContainer.observer,
      RouterContainer.registry
    );
    this.pagePresenter = new PagePresenter(this.moduleState);
    this.applicationPresenter = new ApplicationPresenter(
      this.language.activeTranslator,
      this.topAppBarPresenter,
      this.sideMenuPresenter,
      this.pagePresenter
    );

    this.setupDefaults();
  }

  protected setupDefaults(): void {
    this.language.observer.value = this.language.storage.loadData<string>('languageSetup', 'de-de');
    const homePage: IModulePageData = {
      depth: 0,
      name: 'home',
      url: './',
      module: './HelloWorld'
    };
    const settingsPage: IModulePageData = {
      depth: 1,
      name: 'settings',
      url: './settings/',
      module: './Settings/Settings'
    };
    RouterContainer.registry.registerPage(homePage);
    RouterContainer.registry.registerPage(settingsPage);
    RouterContainer.adapter.addListener(this.applicationActionAdapter.onPageChanged);
    RouterContainer.router.initialize(homePage);
  }
}

export default new Container();