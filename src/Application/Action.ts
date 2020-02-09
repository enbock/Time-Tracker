import {IObserver} from '../Observer/Observer';
import RouterRegistry from '../Router/Registry';
import Router, {IPageData} from '../Router/Router';
import {IAdapter, IModulePageData} from './Application';
import ModuleLoader from './ModuleLoader';

export default class Action {
  menuOpenState: IObserver<boolean>;
  router: Router;
  routerRegistry: RouterRegistry;
  moduleLoader: ModuleLoader;

  constructor(
    menuOpenState: IObserver<boolean>,
    router: Router,
    routerRegistry: RouterRegistry,
    moduleLoader: ModuleLoader
  ) {
    this.menuOpenState = menuOpenState;
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
  }

  protected async loadModule(oldValue: IPageData, newValue: IPageData) {
    await this.moduleLoader.loadModule((newValue as IModulePageData).module);
    this.closeMenu();
  }
}
