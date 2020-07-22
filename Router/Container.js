import Registry from "../Libraries/enbock/application-router/Registry.js";
import Router from "../Libraries/enbock/application-router/Router.js";
import DataStorage from "../Libraries/enbock/simple-storage/DataStorage.js";
import ListenerAdapter from "../Libraries/enbock/state-value-observer/ListenerAdapter.js";
import ValueObserver from "../Libraries/enbock/state-value-observer/ValueObserver.js";
class Container {
    constructor() {
        this.storage = new DataStorage('router', window.localStorage);
        this.adapter = new ListenerAdapter();
        this.observer = new ValueObserver(this.storage.loadData('lastPage', null), this.storage.attach('lastPage', this.adapter));
        this.registry = new Registry(this.observer);
        this.registry.attachAdapter(this.adapter);
        this.router = new Router(this.observer, history);
        this.router.attachTo(window);
        this.router.initialize();
    }
}
export default new Container();
