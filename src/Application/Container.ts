import ModelFactory from './Model/ModelFactory';
import ApplicationPresenter from './Presenter/ApplicationPresenter';

class Container {
  modelFactory: ModelFactory;
  applicationPresenter: ApplicationPresenter;

  constructor() {
    this.modelFactory = new ModelFactory();
    this.applicationPresenter = new ApplicationPresenter(this.modelFactory);
  }
}

export default new Container();