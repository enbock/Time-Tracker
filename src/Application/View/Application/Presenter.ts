import {ILanguageSetup} from '../../../Language/ChangeLanguageSetup';
import Translator from '../../../Language/Translator';
import {IObserver} from '../../../Observer/Observer';
import PagePresenter from '../Page/Presenter';
import SideMenuPresenter from '../SideMenu/Presenter';
import TopBarPresenter from '../TopBar/Presenter';
import Model from './Model';

export default class Presenter {
  languageSetupObserver: IObserver<ILanguageSetup>;
  topAppBarPresenter: TopBarPresenter;
  sideMenuPresenter: SideMenuPresenter;
  pagePresenter: PagePresenter;

  constructor(
    languageSetupObserver: IObserver<ILanguageSetup>,
    topAppBarPresenter: TopBarPresenter,
    sideMenuPresenter: SideMenuPresenter,
    pagePresenter: PagePresenter
  ) {
    this.languageSetupObserver = languageSetupObserver;
    this.topAppBarPresenter = topAppBarPresenter;
    this.sideMenuPresenter = sideMenuPresenter;
    this.pagePresenter = pagePresenter;
  }

  present() {
    const viewModel: Model = new Model();
    const translator: Translator = this.languageSetupObserver.value.translator;

    viewModel.topAppBar = this.topAppBarPresenter.present();
    viewModel.sideMenu = this.sideMenuPresenter.present();
    viewModel.page = this.pagePresenter.present();

    return viewModel;
  }
}