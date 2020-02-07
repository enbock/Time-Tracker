import LanguageContainer from "../Language/Container.js";
import ListenerAdapter from "../Observer/ListenerAdapter.js";
import Observer from "../Observer/Observer.js";
import Action from "./Action.js";
import ModuleLoader from "./ModuleLoader.js";
import ApplicationPresenter from "./View/Application/Presenter.js";
import PagePresenter from "./View/Page/Presenter.js";
import SideMenuPresenter from "./View/SideMenu/Presenter.js";
import TopBarPresenter from "./View/TopBar/Presenter.js";
class Container {
    constructor() {
        this.language = LanguageContainer;
        this.menuOpenStateAdapter =
            {
                onChange: ((oldValue, newValue) => { })
            };
        this.menuOpenState = new Observer(false, this.menuOpenStateAdapter);
        this.applicationAction = new Action(this.menuOpenState);
        this.moduleStateAdapter = new ListenerAdapter();
        this.moduleState = new Observer(null, this.moduleStateAdapter);
        // @ts-ignore
        this.moduleNameStateAdapter = { onChange: undefined };
        this.moduleNameState = new Observer('', this.moduleNameStateAdapter);
        this.moduleLoader = new ModuleLoader('../', this.moduleNameState, this.moduleState);
        this.topAppBarPresenter = new TopBarPresenter(this.language.setupObserver);
        this.sideMenuPresenter = new SideMenuPresenter(this.menuOpenState);
        this.pagePresenter = new PagePresenter(this.moduleState);
        this.applicationPresenter =
            new ApplicationPresenter(this.language.setupObserver, this.topAppBarPresenter, this.sideMenuPresenter, this.pagePresenter);
    }
}
export default new Container();
