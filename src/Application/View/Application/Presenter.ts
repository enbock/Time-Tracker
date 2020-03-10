import Translator from '../../../Language/Translator';
import {IObserver} from '../../../Observer/Observer';
import PagePresenter from '../Page/Presenter';
import SideMenuPresenter from '../SideMenu/Presenter';
import TopBarPresenter from '../TopBar/Presenter';
import Model from './Model';

export default class Presenter {
  topAppBarPresenter: TopBarPresenter;
  translator: IObserver<Translator>;
  sideMenuPresenter: SideMenuPresenter;
  pagePresenter: PagePresenter;

  constructor(
    translator: IObserver<Translator>,
    topAppBarPresenter: TopBarPresenter,
    sideMenuPresenter: SideMenuPresenter,
    pagePresenter: PagePresenter
  ) {
    this.translator = translator;
    this.topAppBarPresenter = topAppBarPresenter;
    this.sideMenuPresenter = sideMenuPresenter;
    this.pagePresenter = pagePresenter;
  }

  present() {
    const viewModel: Model = new Model();
    const translator: Translator = this.translator.value;

    viewModel.topAppBar = this.topAppBarPresenter.present();
    viewModel.sideMenu = this.sideMenuPresenter.present();
    viewModel.page = this.pagePresenter.present();

    return viewModel;
  }
}