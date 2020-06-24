import {IObserver, IObserverAdapter} from '../Observer/Observer';
import RouterRegistry from '../Router/Registry';
import Router, {IPageData} from '../Router/Router';
import {IAdapter, IModulePageData} from './Application';
import ModuleLoader from './ModuleLoader';

export default class Action {
  private menuOpenState: IObserver<boolean>;
  private router: Router;
  private routerAdapter: IObserverAdapter<IPageData | null>;
  private routerRegistry: RouterRegistry;
  private moduleLoader: ModuleLoader;
  private currentPage: IObserver<IPageData | null>;

  constructor(
    menuOpenState: IObserver<boolean>,
    currentPage: IObserver<IPageData | null>,
    router: Router,
    routerRegistry: RouterRegistry,
    routerAdapter: IObserverAdapter<IPageData | null>,
    moduleLoader: ModuleLoader
  ) {
    this.routerAdapter = routerAdapter;
    this.menuOpenState = menuOpenState;
    this.currentPage = currentPage;
    this.router = router;
    this.routerRegistry = routerRegistry;
    this.moduleLoader = moduleLoader;
  }

  get adapter(): IAdapter {
    return {
      onPageChanged: this.loadModule.bind(this),
      onGithubClick: this.openGithubWindow.bind(this),
      onMenuClick: this.switchMenuState.bind(this),
      onClose: this.closeMenu.bind(this),
      onMenu: this.switchPage.bind(this)
    };
  }

  public loadPageConfig() {
    const homePage: IModulePageData = {
      depth: 0,
      name: 'home',
      rootUrl: './',
      url: './',
      module: './HelloWorld'
    };
    const settingsPage: IModulePageData = {
      depth: 1,
      name: 'settings',
      rootUrl: './settings/',
      url: './settings/',
      module: './Settings/Settings'
    };
    this.routerRegistry.registerPage(homePage);
    this.routerRegistry.registerPage(settingsPage);

    if (this.currentPage.value == null) {
      this.router.changePage(homePage);
    } else {
      this.routerAdapter.onChange(this.currentPage.value);
    }
  }

  protected openGithubWindow(): void {
    window.open('https://github.com/enbock/Time-Tracker/', '_blank');
  }

  protected switchMenuState(): void {
    this.menuOpenState.value = !this.menuOpenState.value;
  }

  protected closeMenu(): void {
    this.menuOpenState.value = false;
  }

  protected switchPage(name: string): void {
    const page: IPageData = this.routerRegistry.getPages()[name];
    this.router.changePage(page);
    this.closeMenu();
  }

  protected async loadModule(newValue: IPageData): Promise<void> {
    await this.moduleLoader.loadModule((newValue as IModulePageData).module);
  }
}
