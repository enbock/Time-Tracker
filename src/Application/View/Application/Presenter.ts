import Translator from '../../../Language/Translator';
import {IObserver} from '../../../Observer/Observer';
import PagePresenter from '../Page/Presenter';
import SideMenuPresenter from '../SideMenu/Presenter';
import TopBarPresenter from '../TopBar/Presenter';
import Model from './Model';
import ThemePresenter from './ThemePresenter';

export default class Presenter {
  protected topAppBarPresenter: TopBarPresenter;
  protected themePresenter: ThemePresenter;
  protected translator: IObserver<Translator>;
  protected sideMenuPresenter: SideMenuPresenter;
  protected pagePresenter: PagePresenter;

  constructor(
    translator: IObserver<Translator>,
    topAppBarPresenter: TopBarPresenter,
    sideMenuPresenter: SideMenuPresenter,
    pagePresenter: PagePresenter,
    themePresenter: ThemePresenter
  ) {
    this.themePresenter = themePresenter;
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
    viewModel.theme = this.themePresenter.present();

    return viewModel;
  }
}