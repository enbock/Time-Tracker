import LanguageContainer from '../Language/Container';
import ModelFactory from './Model/Factory/Factory';
import ApplicationPresenter from './Presenter/ApplicationPresenter';

class Container {
  modelFactory: ModelFactory;
  applicationPresenter: ApplicationPresenter;
  language: typeof LanguageContainer;

  constructor() {
    this.language = LanguageContainer;
    this.modelFactory = new ModelFactory();
    this.applicationPresenter = new ApplicationPresenter(this.modelFactory, this.language.setupObserver);
  }
}

export default new Container();