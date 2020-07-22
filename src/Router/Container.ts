import Registry from '@enbock/application-router/Registry';
import Router, {PageData} from '@enbock/application-router/Router';
import DataStorage from '@enbock/simple-storage/DataStorage';
import ListenerAdapter from '@enbock/state-value-observer/ListenerAdapter';
import ValueObserver from '@enbock/state-value-observer/ValueObserver';

class Container {
  adapter: ListenerAdapter<PageData | null>;
  observer: ValueObserver<PageData | null>;
  router: Router;
  registry: Registry;
  storage: DataStorage;

  constructor() {
    this.storage = new DataStorage('router', window.localStorage);
    this.adapter = new ListenerAdapter<PageData | null>();
    this.observer = new ValueObserver<PageData | null>(
      this.storage.loadData('lastPage', null),
      this.storage.attach<PageData | null>('lastPage', this.adapter)
    );

    this.registry = new Registry(this.observer);
    this.registry.attachAdapter(this.adapter);

    this.router = new Router(this.observer, history);
    this.router.attachTo(window);
    this.router.initialize();
  }
}

export default new Container();
