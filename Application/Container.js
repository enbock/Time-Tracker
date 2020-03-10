import LanguageContainer from "../Language/Container.js";
import ListenerAdapter from "../Observer/ListenerAdapter.js";
import Observer from "../Observer/Observer.js";
import RouterContainer from "../Router/Container.js";
import DataStorage from "../Storage/DataStorage.js";
import Action from "./Action.js";
import ModuleLoader from "./ModuleLoader.js";
import ApplicationPresenter from "./View/Application/Presenter.js";
import PagePresenter from "./View/Page/Presenter.js";
import SideMenuPresenter from "./View/SideMenu/Presenter.js";
import TopBarPresenter from "./View/TopBar/Presenter.js";
class Container {
    constructor() {
        this.storage = new DataStorage('application', window.localStorage);
        this.language = LanguageContainer;
        this.menuOpenStateAdapter = { onChange: ((oldValue, newValue) => { }) };
        this.menuOpenState = new Observer(this.storage.loadData('menuOpenState', false), this.storage.attach('menuOpenState', this.menuOpenStateAdapter));
        this.moduleStateAdapter = new ListenerAdapter();
        this.moduleState = new Observer(null, this.moduleStateAdapter);
        this.moduleLoader = new ModuleLoader('../', this.moduleState);
        this.applicationAction =
            new Action(this.menuOpenState, RouterContainer.router, RouterContainer.registry, this.moduleLoader);
        this.applicationActionAdapter = this.applicationAction.adapter;
        this.topAppBarPresenter = new TopBarPresenter(this.language.activeTranslator);
        this.sideMenuPresenter = new SideMenuPresenter(this.menuOpenState, this.language.activeTranslator, RouterContainer.observer, RouterContainer.registry);
        this.pagePresenter = new PagePresenter(this.moduleState);
        this.applicationPresenter = new ApplicationPresenter(this.language.activeTranslator, this.topAppBarPresenter, this.sideMenuPresenter, this.pagePresenter);
        this.setupDefaults();
    }
    setupDefaults() {
        this.language.observer.value = this.language.storage.loadData('languageSetup', 'de-de');
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
    }
}
export default new Container();
