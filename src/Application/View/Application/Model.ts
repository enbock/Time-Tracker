import PageModel from '../Page/Model';
import SideMenuModel from '../SideMenu/Model';
import TopBarModel from '../TopBar/Model';

export default class Model {
  topAppBar: TopBarModel;
  sideMenu: SideMenuModel;
  page: PageModel;

  constructor() {
    this.topAppBar = new TopBarModel();
    this.sideMenu = new SideMenuModel();
    this.page = new PageModel();
  }
}