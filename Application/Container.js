import LanguageContainer from "../Language/Container.js";
import ListenerAdapter from "../Observer/ListenerAdapter.js";
import Observer from "../Observer/Observer.js";
import RouterContainer from "../Router/Container.js";
import Action from "./Action.js";
import ModuleLoader from "./ModuleLoader.js";
import ApplicationPresenter from "./View/Application/Presenter.js";
import PagePresenter from "./View/Page/Presenter.js";
import SideMenuPresenter from "./View/SideMenu/Presenter.js";
import TopBarPresenter from "./View/TopBar/Presenter.js";
class Container {
    constructor() {
        this.language = LanguageContainer;
        this.router = RouterContainer;
        this.menuOpenStateAdapter = { onChange: ((oldValue, newValue) => { }) };
        this.menuOpenState = new Observer(false, this.menuOpenStateAdapter);
        this.moduleStateAdapter = new ListenerAdapter();
        this.moduleState = new Observer(null, this.moduleStateAdapter);
        this.moduleLoader = new ModuleLoader('../', this.moduleState);
        this.applicationAction =
            new Action(this.menuOpenState, this.router.router, this.router.registry, this.moduleLoader);
        this.topAppBarPresenter = new TopBarPresenter(this.language.observer);
        this.sideMenuPresenter =
            new SideMenuPresenter(this.menuOpenState, this.language.observer, this.router.observer, this.router.registry);
        this.pagePresenter = new PagePresenter(this.moduleState);
        this.applicationPresenter = new ApplicationPresenter(this.language.observer, this.topAppBarPresenter, this.sideMenuPresenter, this.pagePresenter);
    }
}
export default new Container();
