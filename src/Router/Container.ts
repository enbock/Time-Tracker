import {IModulePageData} from '../Application/Application';
import ListenerAdapter from '../Observer/ListenerAdapter';
import Observer from '../Observer/Observer';
import DataStorage from '../Storage/DataStorage';
import Registry from './Registry';
import Router, {IPageData} from './Router';

class Container {
  adapter: ListenerAdapter<IPageData>;
  observer: Observer<IPageData>;
  router: Router;
  registry: Registry;
  storage: DataStorage;

  constructor() {
    const homePage: IModulePageData = {
      depth: 0,
      name: 'home',
      url: './',
      module: './HelloWorld'
    };
    const settingsPage: IModulePageData = {
      depth: 1,
      name: 'settings',
      url: './settings/',
      module: './Settings/Settings'
    };

    this.storage = new DataStorage('router', window.localStorage);
    this.adapter = new ListenerAdapter<IPageData>();
    this.observer = new Observer<IPageData>(
      this.storage.loadData('lastPage', homePage),
      this.storage.attach<IPageData>('lastPage', this.adapter)
    );

    this.registry = new Registry(this.observer, this.adapter);
    this.registry.registerPage(homePage);
    this.registry.registerPage(settingsPage);

    this.router = new Router(this.observer, history);
    this.router.attachTo(window);
    this.router.initialize();
  }
}

export default new Container();
