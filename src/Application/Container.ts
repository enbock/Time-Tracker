import LanguageContainer from '../Language/Container';
import ApplicationAction from './ApplicationAction';
import ApplicationPresenter from './View/Application/Presenter';
import TopBarPresenter from './View/TopBar/Presenter';

class Container {
  applicationPresenter: ApplicationPresenter;
  language: typeof LanguageContainer;
  topAppBarPresenter: TopBarPresenter;
  applicationAction: ApplicationAction;

  constructor() {
    this.language = LanguageContainer;
    this.topAppBarPresenter = new TopBarPresenter(this.language.setupObserver);
    this.applicationPresenter = new ApplicationPresenter(this.language.setupObserver, this.topAppBarPresenter);
    this.applicationAction = new ApplicationAction();
  }
}

export default new Container();