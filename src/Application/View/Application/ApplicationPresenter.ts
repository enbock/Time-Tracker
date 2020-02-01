import {ILanguageSetup} from '../../../Language/ChangeLanguageSetup';
import {IObserver} from '../../../Observer/Observer';
import ModelFactory from '../ModelFactory';

export default class ApplicationPresenter {
  protected modelFactory: ModelFactory;
  protected languageSetupObserver: IObserver<ILanguageSetup>;

  constructor(modelFactory: ModelFactory, languageSetupObserver: IObserver<ILanguageSetup>) {
    this.modelFactory = modelFactory;
    this.languageSetupObserver = languageSetupObserver;
  }

  present(data: string) {
    const viewModel = this.modelFactory.createApplicationModel();
    const translator = this.languageSetupObserver.value.translator;
    viewModel.text = data + translator.translate('Application.Test');

    return viewModel;
  }
}