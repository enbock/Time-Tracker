import LanguageContainer from '../Language/Container';
import ApplicationPresenter from './View/Application/Presenter';
import TopBarPresenter from './View/TopBar/Presenter';

class Container {
  applicationPresenter: ApplicationPresenter;
  language: typeof LanguageContainer;
  topAppBarPresenter: TopBarPresenter;

  constructor() {
    this.language = LanguageContainer;
    this.topAppBarPresenter = new TopBarPresenter(this.language.setupObserver);
    this.applicationPresenter = new ApplicationPresenter(this.language.setupObserver, this.topAppBarPresenter);
  }
}

export default new Container();