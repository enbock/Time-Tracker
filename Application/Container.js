import DataStorage from "../Libraries/enbock/simple-storage/DataStorage.js";
import ListenerAdapter from "../Libraries/enbock/state-value-observer/ListenerAdapter.js";
import ValueObserver from "../Libraries/enbock/state-value-observer/ValueObserver.js";
import LanguageContainer from "../Language/Container.js";
import RouterContainer from "../Router/Container.js";
import ThemeContainer from "../Theme/Container.js";
import Action from "./Action.js";
import Application from "./Application.js";
import MenuOpenStateAdapter from "./MenuOpenStateAdapter.js";
import ModuleLoader from "./ModuleLoader.js";
import ApplicationPresenter from "./View/Application/Presenter.js";
import StyleUrlFormatter from "./View/Application/StyleUrlFormatter.js";
import PagePresenter from "./View/Page/Presenter.js";
import SideMenuPresenter from "./View/SideMenu/Presenter.js";
import TopBarPresenter from "./View/TopBar/Presenter.js";
class Container {
    constructor() {
        this.storage = new DataStorage('application', window.localStorage);
        this.language = LanguageContainer;
        this.theme = ThemeContainer;
        this.menuOpenStateAdapter = new MenuOpenStateAdapter();
        this.menuOpenState = new ValueObserver(this.storage.loadData('menuOpenState', false), this.storage.attach('menuOpenState', this.menuOpenStateAdapter));
        this.moduleStateAdapter = new ListenerAdapter();
        this.moduleState = new ValueObserver(null, this.moduleStateAdapter);
        this.moduleLoader = new ModuleLoader('../', this.moduleState);
        this.applicationAction = new Action(this.menuOpenState, RouterContainer.observer, RouterContainer.router, RouterContainer.registry, RouterContainer.adapter, this.moduleLoader);
        this.applicationActionAdapter = this.applicationAction.adapter;
        this.topAppBarPresenter = new TopBarPresenter(this.language.activeTranslator);
        this.sideMenuPresenter = new SideMenuPresenter(this.menuOpenState, this.language.activeTranslator, RouterContainer.observer, RouterContainer.registry);
        this.pagePresenter = new PagePresenter(this.moduleState);
        this.styleUrlFormatter = new StyleUrlFormatter(RouterContainer.observer);
        this.applicationPresenter = new ApplicationPresenter(this.theme.currentTheme, this.topAppBarPresenter, this.sideMenuPresenter, this.pagePresenter, this.styleUrlFormatter);
        this.application = new Application(this.applicationActionAdapter, this.applicationPresenter);
        RouterContainer.adapter.addListener(this.applicationActionAdapter.onPageChanged);
        this.application.attachToLanguage(this.language.adapter);
        this.application.attachToMenuOpenState(this.menuOpenStateAdapter);
        this.application.attachToModuleState(this.moduleStateAdapter);
        //Debug - SideAccess
        // @ts-ignore
        window.ApplicationContainer = this;
        // @ts-ignore
        window.RouterContainer = RouterContainer;
    }
}
export default new Container();
