import ListenerAdapter from '../Observer/ListenerAdapter';
import Observer from '../Observer/Observer';
import Registry from './Registry';
import Router, {IPageData} from './Router';

class Container {
  adapter: ListenerAdapter<IPageData>;
  observer: Observer<IPageData>;
  router: Router;
  registry: Registry;

  constructor() {
    this.adapter = new ListenerAdapter<IPageData>();
    this.observer = new Observer<IPageData>(
      {
        name: '',
        url: '',
        depth: 0
      },
      this.adapter
    );

    this.router = new Router(this.observer, history);
    this.router.attachTo(window);
    this.registry = new Registry(this.observer, this.adapter);
  }
}

export default new Container();