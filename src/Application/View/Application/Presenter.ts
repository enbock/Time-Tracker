import {ILanguageSetup} from '../../../Language/ChangeLanguageSetup';
import Translator from '../../../Language/Translator';
import {IObserver} from '../../../Observer/Observer';
import SideMenuPresenter from '../SideMenu/Presenter';
import TopBarPresenter from '../TopBar/Presenter';
import Model from './Model';

export default class Presenter {
  languageSetupObserver: IObserver<ILanguageSetup>;
  topAppBarPresenter: TopBarPresenter;
  sideMenuPresenter: SideMenuPresenter;

  constructor(
    languageSetupObserver: IObserver<ILanguageSetup>,
    topAppBarPresenter: TopBarPresenter,
    sideMenuPresenter: SideMenuPresenter
  ) {
    this.languageSetupObserver = languageSetupObserver;
    this.topAppBarPresenter = topAppBarPresenter;
    this.sideMenuPresenter = sideMenuPresenter;
  }

  present(data: string) {
    const viewModel: Model = new Model();
    const translator: Translator = this.languageSetupObserver.value.translator;
    viewModel.text = data + translator.translate('Application.Test');
    viewModel.topAppBar = this.topAppBarPresenter.present();
    viewModel.sideMenu = this.sideMenuPresenter.present();

    return viewModel;
  }
}