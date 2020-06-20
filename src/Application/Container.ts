import React from 'react';
import LanguageContainer from '../Language/Container';
import ListenerAdapter from '../Observer/ListenerAdapter';
import Observer, {IObserverAdapter} from '../Observer/Observer';
import RouterContainer from '../Router/Container';
import DataStorage from '../Storage/DataStorage';
import ThemeContainer from '../Theme/Container';
import Action from './Action';
import Application, {IAdapter} from './Application';
import ModuleLoader from './ModuleLoader';
import ApplicationPresenter from './View/Application/Presenter';
import StyleUrlFormatter from './View/Application/StyleUrlFormatter';
import PagePresenter from './View/Page/Presenter';
import SideMenuPresenter from './View/SideMenu/Presenter';
import TopBarPresenter from './View/TopBar/Presenter';

class Container {
  language: typeof LanguageContainer;
  theme: typeof ThemeContainer;
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
  styleUrlFormatter: StyleUrlFormatter;
  application: Application;

  constructor() {
    this.storage = new DataStorage('application', window.localStorage);
    this.language = LanguageContainer;
    this.theme = ThemeContainer;

    this.menuOpenStateAdapter = {onChange: ((newValue:boolean) => {})};
    this.menuOpenState = new Observer<boolean>(
      this.storage.loadData<boolean>('menuOpenState', false),
      this.storage.attach<boolean>('menuOpenState', this.menuOpenStateAdapter)
    );

    this.moduleStateAdapter = new ListenerAdapter<typeof React.Component | null>();
    this.moduleState = new Observer<typeof React.Component | null>(null, this.moduleStateAdapter);
    this.moduleLoader = new ModuleLoader('../', this.moduleState);

    this.applicationAction = new Action(
      this.menuOpenState,
      RouterContainer.router,
      RouterContainer.registry,
      this.moduleLoader
    );
    this.applicationActionAdapter = this.applicationAction.adapter;

    this.topAppBarPresenter = new TopBarPresenter(this.language.activeTranslator);
    this.sideMenuPresenter = new SideMenuPresenter(
      this.menuOpenState,
      this.language.activeTranslator,
      RouterContainer.observer,
      RouterContainer.registry
    );
    this.pagePresenter = new PagePresenter(this.moduleState);
    this.styleUrlFormatter = new StyleUrlFormatter(RouterContainer.observer);
    this.applicationPresenter = new ApplicationPresenter(
      this.theme.currentTheme,
      this.topAppBarPresenter,
      this.sideMenuPresenter,
      this.pagePresenter,
      this.styleUrlFormatter
    );

    this.application = new Application(this.applicationActionAdapter, this.applicationPresenter);
    this.setupDefaults();
  }

  protected setupDefaults(): void {
    RouterContainer.adapter.addListener(this.applicationActionAdapter.onPageChanged);
    this.applicationActionAdapter.onPageChanged(RouterContainer.observer.value)

    this.application.attachToLanguage(this.language.adapter);
    this.application.attachToMenuOpenState(this.menuOpenStateAdapter);
    this.application.attachToModuleState(this.moduleStateAdapter);
  }
}

export default new Container();
