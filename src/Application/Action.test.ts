import {IObserver} from '../Observer/Observer';
import RouterRegistry from '../Router/Registry';
import Router, {IPageData} from '../Router/Router';
import Action from './Action';
import {IModulePageData} from './Application';
import ModuleLoader from './ModuleLoader';

describe('Application.Action', () => {
  let menuOpenState: IObserver<boolean>, router: Router, routerRegistry: RouterRegistry, moduleLoader: ModuleLoader;

  beforeEach(() => {
    menuOpenState = {
      value: false,
      adapter: {onChange: (oldValue, newValue) => {}}
    };
    router = jest.genMockFromModule<Router>('../Router/Router');
    routerRegistry = jest.genMockFromModule<RouterRegistry>('../Router/Registry');
    moduleLoader = jest.genMockFromModule<ModuleLoader>('./ModuleLoader');
  });

  it('Open tab to github', () => {
    const action = new Action(menuOpenState, router, routerRegistry, moduleLoader);

    window.open = jest.fn();
    action.adapter.onGithubClick();

    expect(window.open).toHaveBeenCalledWith('https://github.com/enbock/Time-Tracker/', '_blank');
  });

  it('Switch menu', () => {
    const action = new Action(menuOpenState, router, routerRegistry, moduleLoader);

    action.adapter.onMenuClick();

    expect(menuOpenState.value).toBe(true);
  });

  it('Close menu', () => {
    menuOpenState.value = true;
    const action = new Action(menuOpenState, router, routerRegistry, moduleLoader);

    action.adapter.onClose();
    action.adapter.onClose();

    expect(menuOpenState.value).toBe(false);
  });

  it('Change page', () => {
    const action = new Action(menuOpenState, router, routerRegistry, moduleLoader);
    const page: IPageData = {
      depth: 0,
      name: 'name',
      url: 'url'
    };
    routerRegistry.getPages = jest.fn().mockReturnValue({name: page});
    router.changePage = jest.fn();

    action.adapter.onMenu('name');
    expect(router.changePage).toHaveBeenCalledWith(page);
  });

  it('Load module on page change', async () => {
    const action = new Action(menuOpenState, router, routerRegistry, moduleLoader);
    const page: IModulePageData = {
      module: './New/Module',
      depth: 0,
      name: 'name',
      url: 'url'
    };
    menuOpenState.value = true;
    moduleLoader.loadModule = jest.fn().mockResolvedValue(undefined);

    await action.adapter.onPageChanged(page, page);
    expect(moduleLoader.loadModule).toHaveBeenCalledWith('./New/Module');
    expect(menuOpenState.value).toBeFalsy();
  });
});