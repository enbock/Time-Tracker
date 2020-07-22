import DataStorage from '@enbock/simple-storage/DataStorage';
import ListenerAdapter from '@enbock/state-value-observer/ListenerAdapter';
import ValueObserver, {ObserverAdapter} from '@enbock/state-value-observer/ValueObserver';
import React from 'react';
import LanguageContainer from '../Language/Container';
import RouterContainer from '../Router/Container';
import ThemeContainer from '../Theme/Container';
import Action from './Action';
import Application, {Adapter} from './Application';
import MenuOpenStateAdapter from './MenuOpenStateAdapter';
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
  menuOpenStateAdapter: ObserverAdapter<boolean>;
  menuOpenState: ValueObserver<boolean>;
  sideMenuPresenter: SideMenuPresenter;
  moduleStateAdapter: ListenerAdapter<typeof React.Component | null>;
  moduleState: ValueObserver<typeof React.Component | null>;
  moduleLoader: ModuleLoader;
  pagePresenter: PagePresenter;
  applicationActionAdapter: Adapter;
  storage: DataStorage;
  styleUrlFormatter: StyleUrlFormatter;
  application: Application;

  constructor() {
    this.storage = new DataStorage('application', window.localStorage);
    this.language = LanguageContainer;
    this.theme = ThemeContainer;

    this.menuOpenStateAdapter = new MenuOpenStateAdapter();
    this.menuOpenState = new ValueObserver<boolean>(
      this.storage.loadData<boolean>('menuOpenState', false),
      this.storage.attach<boolean>('menuOpenState', this.menuOpenStateAdapter)
    );

    this.moduleStateAdapter = new ListenerAdapter<typeof React.Component | null>();
    this.moduleState = new ValueObserver<typeof React.Component | null>(null, this.moduleStateAdapter);
    this.moduleLoader = new ModuleLoader('../', this.moduleState);

    this.applicationAction = new Action(
      this.menuOpenState,
      RouterContainer.observer,
      RouterContainer.router,
      RouterContainer.registry,
      RouterContainer.adapter,
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

    RouterContainer.adapter.addListener(this.applicationActionAdapter.onPageChanged);
    this.application.attachToLanguage(this.language.adapter);
    this.application.attachToMenuOpenState(this.menuOpenStateAdapter);
    this.application.attachToModuleState(this.moduleStateAdapter);

    //Debug - SideAccess
    // @ts-ignore
    window.ApplicationContainer = this;
    // @ts-ignore
    window.RouterContainer = RouterContainer;
  }
}

export default new Container();
