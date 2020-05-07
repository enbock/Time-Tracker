import LanguageContainer from "../Language/Container.js";
import ListenerAdapter from "../Observer/ListenerAdapter.js";
import Observer from "../Observer/Observer.js";
import RouterContainer from "../Router/Container.js";
import DataStorage from "../Storage/DataStorage.js";
import ThemeContainer from "../Theme/Container.js";
import Action from "./Action.js";
import Application from "./Application.js";
import ModuleLoader from "./ModuleLoader.js";
import ApplicationPresenter from "./View/Application/Presenter.js";
import ThemePresenter from "./View/Application/ThemePresenter.js";
import PagePresenter from "./View/Page/Presenter.js";
import SideMenuPresenter from "./View/SideMenu/Presenter.js";
import TopBarPresenter from "./View/TopBar/Presenter.js";
class Container {
    constructor() {
        this.storage = new DataStorage('application', window.localStorage);
        this.language = LanguageContainer;
        this.theme = ThemeContainer;
        this.menuOpenStateAdapter = { onChange: ((newValue) => { }) };
        this.menuOpenState = new Observer(this.storage.loadData('menuOpenState', false), this.storage.attach('menuOpenState', this.menuOpenStateAdapter));
        this.moduleStateAdapter = new ListenerAdapter();
        this.moduleState = new Observer(null, this.moduleStateAdapter);
        this.moduleLoader = new ModuleLoader('../', this.moduleState);
        this.applicationAction = new Action(this.menuOpenState, RouterContainer.router, RouterContainer.registry, this.moduleLoader);
        this.applicationActionAdapter = this.applicationAction.adapter;
        this.topAppBarPresenter = new TopBarPresenter(this.language.activeTranslator);
        this.sideMenuPresenter = new SideMenuPresenter(this.menuOpenState, this.language.activeTranslator, RouterContainer.observer, RouterContainer.registry);
        this.pagePresenter = new PagePresenter(this.moduleState);
        this.themePresenter = new ThemePresenter(this.theme.currentTheme);
        this.applicationPresenter = new ApplicationPresenter(this.language.activeTranslator, this.topAppBarPresenter, this.sideMenuPresenter, this.pagePresenter, this.themePresenter);
        this.application = new Application(this.applicationActionAdapter, this.applicationPresenter);
        this.setupDefaults();
    }
    setupDefaults() {
        const homePage = {
            depth: 0,
            name: 'home',
            url: './',
            module: './HelloWorld'
        };
        const settingsPage = {
            depth: 1,
            name: 'settings',
            url: './settings/',
            module: './Settings/Settings'
        };
        RouterContainer.registry.registerPage(homePage);
        RouterContainer.registry.registerPage(settingsPage);
        RouterContainer.adapter.addListener(this.applicationActionAdapter.onPageChanged);
        RouterContainer.router.initialize(homePage);
        this.application.attachToLanguage(this.language.adapter);
        this.application.attachToMenuOpenState(this.menuOpenStateAdapter);
        this.application.attachToModuleState(this.moduleStateAdapter);
    }
}
export default new Container();
