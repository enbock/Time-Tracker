import ModelFactory from '../Model/ModelFactory';

export default class ApplicationPresenter {
  modelFactory: ModelFactory;

  constructor(modelFactory: ModelFactory) {
    this.modelFactory = modelFactory;
  }

  present(data: string) {
    const viewModel = this.modelFactory.createApplicationModel();
    viewModel.text = data + ', which has a presenter and need language manager';

    return viewModel;
  }
}