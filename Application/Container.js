import LanguageContainer from "../Language/Container.js";
import Observer from "../Observer/Observer.js";
import ApplicationAction from "./ApplicationAction.js";
import ApplicationPresenter from "./View/Application/Presenter.js";
import SideMenuPresenter from "./View/SideMenu/Presenter.js";
import TopBarPresenter from "./View/TopBar/Presenter.js";
class Container {
    constructor() {
        this.language = LanguageContainer;
        this.menuOpenStateAdapter = { onChange: ((oldValue, newValue) => { }) };
        this.menuOpenState = new Observer(false, this.menuOpenStateAdapter);
        this.applicationAction = new ApplicationAction(this.menuOpenState);
        this.topAppBarPresenter = new TopBarPresenter(this.language.setupObserver);
        this.sideMenuPresenter = new SideMenuPresenter(this.menuOpenState);
        this.applicationPresenter =
            new ApplicationPresenter(this.language.setupObserver, this.topAppBarPresenter, this.sideMenuPresenter);
    }
}
export default new Container();
