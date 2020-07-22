import {Observer} from '@enbock/state-value-observer/ValueObserver';
import {Theme} from '../../../Theme/ThemesRegistry';
import PagePresenter from '../Page/Presenter';
import SideMenuPresenter from '../SideMenu/Presenter';
import TopBarPresenter from '../TopBar/Presenter';
import Model from './Model';
import StyleUrlFormatter from './StyleUrlFormatter';

export default class Presenter implements Presenter {
  private topAppBarPresenter: TopBarPresenter;
  private styleUrlFormatter: StyleUrlFormatter;
  private currentTheme: Observer<Theme>;
  private sideMenuPresenter: SideMenuPresenter;
  private pagePresenter: PagePresenter;
  baseStyles: string[];
  lastThemeStyles: string[];
  lastTheme: string;

  constructor(
    currentTheme: Observer<Theme>,
    topAppBarPresenter: TopBarPresenter,
    sideMenuPresenter: SideMenuPresenter,
    pagePresenter: PagePresenter,
    styleUrlFormatter: StyleUrlFormatter
  ) {
    this.currentTheme = currentTheme;
    this.styleUrlFormatter = styleUrlFormatter;
    this.topAppBarPresenter = topAppBarPresenter;
    this.sideMenuPresenter = sideMenuPresenter;
    this.pagePresenter = pagePresenter;

    this.baseStyles = [];
    this.lastThemeStyles = [];
    this.lastTheme = '';
  }

  present(): Model {
    const viewModel: Model = new Model();

    viewModel.topAppBar = this.topAppBarPresenter.present();
    viewModel.sideMenu = this.sideMenuPresenter.present();
    viewModel.page = this.pagePresenter.present();

    if (this.baseStyles.length == 0) {
      this.baseStyles = [
        'material-components-web.min',
        'material-components-web.icons',
        'Application'
      ]
        .map(
          (url: string) => {
            return this.styleUrlFormatter.format(url);
          }
        );
    }

    const theme: Theme = this.currentTheme.value;

    if (this.lastTheme != theme.name) {
      this.lastTheme = theme.name;
      this.lastThemeStyles = [];
      this.lastThemeStyles.push(!theme.isBuildIn ? theme.url : this.styleUrlFormatter.format(theme.url));
      this.lastThemeStyles.push(this.styleUrlFormatter.format('Theme/ThemePatch'));
    }

    viewModel.styleSet = [...this.baseStyles, ...this.lastThemeStyles];

    return viewModel;
  }
}
