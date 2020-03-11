import PageModel from '../Page/Model';
import SideMenuModel from '../SideMenu/Model';
import TopBarModel from '../TopBar/Model';
import ThemeModel from './ThemeModel';

export default class Model {
  topAppBar: TopBarModel;
  sideMenu: SideMenuModel;
  page: PageModel;
  theme: ThemeModel;

  constructor() {
    this.topAppBar = new TopBarModel();
    this.sideMenu = new SideMenuModel();
    this.page = new PageModel();
    this.theme = new ThemeModel();
  }
}