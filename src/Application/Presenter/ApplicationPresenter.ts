import {ILanguageSetup} from '../../Language/ChangeLanguageSetup';
import {IObserver} from '../../Observer/Observer';
import Factory from '../Model/Factory/Factory';

export default class ApplicationPresenter {
  protected modelFactory: Factory;
  protected languageSetupObserver: IObserver<ILanguageSetup>;

  constructor(modelFactory: Factory, languageSetupObserver: IObserver<ILanguageSetup>) {
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