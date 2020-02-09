import ListenerAdapter from "../Observer/ListenerAdapter.js";
import Observer from "../Observer/Observer.js";
import Registry from "./Registry.js";
import Router from "./Router.js";
class Container {
    constructor() {
        this.adapter = new ListenerAdapter();
        this.observer = new Observer({
            name: '',
            url: '',
            depth: 0
        }, this.adapter);
        this.router = new Router(this.observer, history);
        this.router.attachTo(window);
        this.registry = new Registry(this.observer, this.adapter);
    }
}
export default new Container();
