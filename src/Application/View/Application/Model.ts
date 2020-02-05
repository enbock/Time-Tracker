import SideMenuModel from '../SideMenu/Model';
import TopBarModel from '../TopBar/Model';

export default class Model {
  text: string;
  topAppBar: TopBarModel;
  sideMenu: SideMenuModel;

  constructor() {
    this.topAppBar = new TopBarModel();
    this.sideMenu = new SideMenuModel();
    this.text = '';
  }
}