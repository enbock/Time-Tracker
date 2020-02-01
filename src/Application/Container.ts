import LanguageContainer from '../Language/Container';
import ApplicationPresenter from './View/Application/ApplicationPresenter';
import ModelFactory from './View/ModelFactory';

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