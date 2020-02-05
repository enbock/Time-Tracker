import SideMenuModel from "../SideMenu/Model.js";
import TopBarModel from "../TopBar/Model.js";
export default class Model {
    constructor() {
        this.topAppBar = new TopBarModel();
        this.sideMenu = new SideMenuModel();
        this.text = '';
    }
}
