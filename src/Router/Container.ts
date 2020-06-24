import ListenerAdapter from '../Observer/ListenerAdapter';
import Observer from '../Observer/Observer';
import DataStorage from '../Storage/DataStorage';
import Registry from './Registry';
import Router, {IPageData} from './Router';

class Container {
  adapter: ListenerAdapter<IPageData>;
  observer: Observer<IPageData | null>;
  router: Router;
  registry: Registry;
  storage: DataStorage;

  constructor() {
    this.storage = new DataStorage('router', window.localStorage);
    this.adapter = new ListenerAdapter<IPageData>();
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
