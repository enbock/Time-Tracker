import ListenerAdapter from "../Observer/ListenerAdapter.js";
import Observer from "../Observer/Observer.js";
import DataStorage from "../Storage/DataStorage.js";
import Registry from "./Registry.js";
import Router from "./Router.js";
class Container {
    constructor() {
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
        this.storage = new DataStorage('router', window.localStorage);
        this.adapter = new ListenerAdapter();
        this.observer = new Observer(this.storage.loadData('lastPage', homePage), this.storage.attach('lastPage', this.adapter));
        this.registry = new Registry(this.observer, this.adapter);
        this.registry.registerPage(homePage);
        this.registry.registerPage(settingsPage);
        this.router = new Router(this.observer, history);
        this.router.attachTo(window);
        this.router.initialize();
    }
}
export default new Container();
