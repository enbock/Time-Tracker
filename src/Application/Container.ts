import LanguageContainer from '../Language/Container';
import Observer, {IObserverAdapter} from '../Observer/Observer';
import ApplicationAction from './ApplicationAction';
import ApplicationPresenter from './View/Application/Presenter';
import SideMenuPresenter from './View/SideMenu/Presenter';
import TopBarPresenter from './View/TopBar/Presenter';

class Container {
  applicationPresenter: ApplicationPresenter;
  language: typeof LanguageContainer;
  topAppBarPresenter: TopBarPresenter;
  applicationAction: ApplicationAction;
  menuOpenStateAdapter: IObserverAdapter<boolean>;
  menuOpenState: Observer<boolean>;
  sideMenuPresenter: SideMenuPresenter;

  constructor() {
    this.language = LanguageContainer;
    this.menuOpenStateAdapter = {onChange: ((oldValue, newValue) => {})};
    this.menuOpenState = new Observer<boolean>(false, this.menuOpenStateAdapter);
    this.applicationAction = new ApplicationAction(this.menuOpenState);

    this.topAppBarPresenter = new TopBarPresenter(this.language.setupObserver);
    this.sideMenuPresenter = new SideMenuPresenter(this.menuOpenState);
    this.applicationPresenter =
      new ApplicationPresenter(this.language.setupObserver, this.topAppBarPresenter, this.sideMenuPresenter);
  }
}

export default new Container();