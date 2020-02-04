import {ILanguageSetup} from '../../../Language/ChangeLanguageSetup';
import Translator from '../../../Language/Translator';
import {IObserver} from '../../../Observer/Observer';
import TopBarPresenter from '../TopBar/Presenter.js';
import Model from './Model';

export default class Presenter {
  languageSetupObserver: IObserver<ILanguageSetup>;
  topAppBarPresenter: TopBarPresenter;

  constructor(languageSetupObserver: IObserver<ILanguageSetup>, topAppBarPresenter: TopBarPresenter) {
    this.languageSetupObserver = languageSetupObserver;
    this.topAppBarPresenter = topAppBarPresenter;
  }

  present(data: string) {
    const viewModel: Model = new Model();
    const translator: Translator = this.languageSetupObserver.value.translator;
    viewModel.text = data + translator.translate('Application.Test');
    viewModel.topAppBar = this.topAppBarPresenter.present();

    return viewModel;
  }
}