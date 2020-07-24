import RouterRegistry from '@enbock/application-router/Registry';
import Router, {PageData} from '@enbock/application-router/Router';
import {Observer, ObserverAdapter} from '@enbock/state-value-observer/ValueObserver';
import {Adapter, ModulePageData} from './Application';
import ModuleLoader from './ModuleLoader';

class PageNotInRegistry extends Error {}

export default class Action {
  private menuOpenState: Observer<boolean>;
  private router: Router;
  private routerAdapter: ObserverAdapter<PageData | null>;
  private routerRegistry: RouterRegistry;
  private moduleLoader: ModuleLoader;
  private currentPage: Observer<PageData | null>;

  constructor(
    menuOpenState: Observer<boolean>,
    currentPage: Observer<PageData | null>,
    router: Router,
    routerRegistry: RouterRegistry,
    routerAdapter: ObserverAdapter<PageData | null>,
    moduleLoader: ModuleLoader
  ) {
    this.routerAdapter = routerAdapter;
    this.menuOpenState = menuOpenState;
    this.currentPage = currentPage;
    this.router = router;
    this.routerRegistry = routerRegistry;
    this.moduleLoader = moduleLoader;
  }

  get adapter(): Adapter {
    return {
      onPageChanged: this.loadModule.bind(this),
      onGithubClick: this.openGithubWindow.bind(this),
      onMenuClick: this.switchMenuState.bind(this),
      onClose: this.closeMenu.bind(this),
      onMenu: this.switchPage.bind(this)
    };
  }

  public loadPageConfig() {
    const homePage: ModulePageData = {
      name: 'home',
      baseUrl: './',
      currentUrl: './',
      module: './HelloWorld'
    };
    const settingsPage: ModulePageData = {
      name: 'settings',
      baseUrl: './settings/',
      currentUrl: './settings/',
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
    try {
      const page: PageData = this.getPageFromRegistry(name);
      this.router.changePage(page);
      this.closeMenu();
    } catch (notInRegistryError) {
    }
  }

  private getPageFromRegistry(name: string): PageData {
    let page: PageData | null = null;
    this.routerRegistry.getPages().forEach(
      function searchForName(item: PageData): void {
        if (item.name == name) page = item;
      }
    );

    if (page === null) {
      throw new PageNotInRegistry();
    }

    return page;
  }

  protected async loadModule(newValue: PageData): Promise<void> {
    await this.moduleLoader.loadModule((newValue as ModulePageData).module);
  }
}
