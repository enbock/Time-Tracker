import React from 'react';
import LanguageContainer from '../Language/Container';
import ListenerAdapter from '../Observer/ListenerAdapter';
import Observer, {IObserverAdapter} from '../Observer/Observer';
import Action from './Action';
import ModuleLoader from './ModuleLoader';
import ApplicationPresenter from './View/Application/Presenter';
import PagePresenter from './View/Page/Presenter';
import SideMenuPresenter from './View/SideMenu/Presenter';
import TopBarPresenter from './View/TopBar/Presenter';

class Container {
  applicationPresenter: ApplicationPresenter;
  language: typeof LanguageContainer;
  topAppBarPresenter: TopBarPresenter;
  applicationAction: Action;
  menuOpenStateAdapter: IObserverAdapter<boolean>;
  menuOpenState: Observer<boolean>;
  sideMenuPresenter: SideMenuPresenter;
  moduleStateAdapter: ListenerAdapter<typeof React.Component | null>;
  moduleState: Observer<typeof React.Component | null>;
  moduleNameStateAdapter: IObserverAdapter<string>;
  moduleNameState: Observer<string>;
  moduleLoader: ModuleLoader;
  pagePresenter: PagePresenter;

  constructor() {
    this.language = LanguageContainer;
    this.menuOpenStateAdapter =
      {
        onChange: (
          (oldValue, newValue) => {}
        )
      };
    this.menuOpenState = new Observer<boolean>(false, this.menuOpenStateAdapter);
    this.applicationAction = new Action(this.menuOpenState);

    this.moduleStateAdapter = new ListenerAdapter<typeof React.Component | null>();
    this.moduleState = new Observer<typeof React.Component | null>(null, this.moduleStateAdapter);
    // @ts-ignore
    this.moduleNameStateAdapter = {onChange: undefined};
    this.moduleNameState = new Observer<string>('', this.moduleNameStateAdapter);
    this.moduleLoader = new ModuleLoader('../', this.moduleNameState, this.moduleState);

    this.topAppBarPresenter = new TopBarPresenter(this.language.setupObserver);
    this.sideMenuPresenter = new SideMenuPresenter(this.menuOpenState);
    this.pagePresenter = new PagePresenter(this.moduleState);
    this.applicationPresenter =
      new ApplicationPresenter(
        this.language.setupObserver,
        this.topAppBarPresenter,
        this.sideMenuPresenter,
        this.pagePresenter
      );
  }
}

export default new Container();