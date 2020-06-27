import Registry from '@enbock/application-router/Registry';
import Router, {IPageData} from '@enbock/application-router/Router';
import DataStorage from '@enbock/simple-storage/DataStorage';
import ListenerAdapter from '@enbock/state-value-observer/ListenerAdapter';
import Observer from '@enbock/state-value-observer/Observer';

class Container {
  adapter: ListenerAdapter<IPageData | null>;
  observer: Observer<IPageData | null>;
  router: Router;
  registry: Registry;
  storage: DataStorage;

  constructor() {
    this.storage = new DataStorage('router', window.localStorage);
    this.adapter = new ListenerAdapter<IPageData | null>();
    this.observer = new Observer<IPageData | null>(
      this.storage.loadData('lastPage', null),
      this.storage.attach<IPageData | null>('lastPage', this.adapter)
    );

    this.registry = new Registry(this.observer);
    this.registry.attachAdapter(this.adapter);

    this.router = new Router(this.observer, history);
    this.router.attachTo(window);
    this.router.initialize();
  }
}

export default new Container();
