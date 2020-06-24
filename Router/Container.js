import ListenerAdapter from "../Observer/ListenerAdapter.js";
import Observer from "../Observer/Observer.js";
import DataStorage from "../Storage/DataStorage.js";
import Registry from "./Registry.js";
import Router from "./Router.js";
class Container {
    constructor() {
        this.storage = new DataStorage('router', window.localStorage);
        this.adapter = new ListenerAdapter();
        this.observer = new Observer(this.storage.loadData('lastPage', null), this.storage.attach('lastPage', this.adapter));
        this.registry = new Registry(this.observer);
        this.registry.attachAdapter(this.adapter);
        this.router = new Router(this.observer, history);
        this.router.attachTo(window);
        this.router.initialize();
    }
}
export default new Container();
