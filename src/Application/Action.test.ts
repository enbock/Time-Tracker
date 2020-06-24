import {IObserver, IObserverAdapter} from '../Observer/Observer';
import RouterRegistry from '../Router/Registry';
import Router, {IPageData} from '../Router/Router';
import Action from './Action';
import {IModulePageData} from './Application';
import ModuleLoader from './ModuleLoader';

describe('Application.Action', () => {
  let menuOpenState: IObserver<boolean>,
    routerObserver: IObserver<IPageData | null>,
    router: Router,
    routerRegistry: RouterRegistry,
    routerAdapter: IObserverAdapter<IPageData | null>,
    moduleLoader: ModuleLoader
  ;

  beforeEach(() => {
    menuOpenState = {
      value: false,
      adapter: {onChange: (newValue) => {}}
    };
    router = jest.genMockFromModule<Router>('../Router/Router');
    routerRegistry = jest.genMockFromModule<RouterRegistry>('../Router/Registry');
    moduleLoader = jest.genMockFromModule<ModuleLoader>('./ModuleLoader');
    routerAdapter = {
      onChange: jest.fn()
    };
    routerObserver = {
      adapter: routerAdapter,
      value: null
    };
  });

  function createTestObject(): Action {
    return new Action(
      menuOpenState,
      routerObserver,
      router,
      routerRegistry,
      routerAdapter,
      moduleLoader
    );
  }

  it('Open tab to github', () => {
    const action: Action = createTestObject();

    window.open = jest.fn();
    action.adapter.onGithubClick();

    expect(window.open).toHaveBeenCalledWith('https://github.com/enbock/Time-Tracker/', '_blank');
  });

  it('Switch menu', () => {
    const action: Action = createTestObject();

    action.adapter.onMenuClick();

    expect(menuOpenState.value).toBe(true);
  });

  it('Close menu', () => {
    menuOpenState.value = true;
    const action: Action = createTestObject();

    action.adapter.onClose();
    action.adapter.onClose();

    expect(menuOpenState.value).toBe(false);
  });

  it('Change page', () => {
    const action: Action = createTestObject();
    const page: IPageData = {
      depth: 0,
      name: 'name',
      rootUrl: 'rootUrl',
      url: 'url'
    };
    routerRegistry.getPages = jest.fn().mockReturnValue({name: page});
    router.changePage = jest.fn();
    menuOpenState.value = true;

    action.adapter.onMenu('name');
    expect(router.changePage).toHaveBeenCalledWith(page);
    expect(menuOpenState.value).toBeFalsy();
  });

  it('Load module on page change', async () => {
    const action: Action = createTestObject();
    const page: IModulePageData = {
      module: './New/Module',
      depth: 0,
      name: 'name',
      rootUrl: 'rootUrl',
      url: 'url'
    };
    moduleLoader.loadModule = jest.fn().mockResolvedValue(undefined);

    await action.adapter.onPageChanged(page);
    expect(moduleLoader.loadModule).toHaveBeenCalledWith('./New/Module');
  });

  it('Load page config and initialize module loader with home page', () => {
    routerRegistry.registerPage = jest.fn();
    router.changePage = jest.fn();
    const action: Action = createTestObject();
    action.loadPageConfig();

    const homePage: { depth: number; module: string; name: string; url: string; rootUrl: string } = {
      depth: 0,
      name: 'home',
      rootUrl: './',
      url: './',
      module: './HelloWorld'
    };
    expect(routerRegistry.registerPage).toBeCalledWith(homePage);
    expect(routerRegistry.registerPage).toBeCalledWith({
      depth: 1,
      name: 'settings',
      rootUrl: './settings/',
      url: './settings/',
      module: './Settings/Settings'
    });
    expect(router.changePage).toBeCalledWith(homePage);
  });

  it('Load page config and initialize module loader with last page', () => {
    const homePage: { depth: number; module: string; name: string; url: string; rootUrl: string } = {
      depth: 0,
      name: 'home',
      rootUrl: './',
      url: './',
      module: './HelloWorld'
    };
    const lastPage: { depth: number; module: string; name: string; url: string; rootUrl: string } = {
      depth: 1,
      name: 'settings',
      rootUrl: './settings/',
      url: './settings/',
      module: './Settings/Settings'
    };

    routerRegistry.registerPage = jest.fn();
    router.changePage = jest.fn();
    routerAdapter.onChange = jest.fn();
    routerObserver.value = lastPage;

    const action: Action = createTestObject();
    action.loadPageConfig();

    expect(routerRegistry.registerPage).toBeCalledWith(homePage);
    expect(routerRegistry.registerPage).toBeCalledWith(lastPage);
    expect(router.changePage).not.toHaveBeenCalled();
    expect(routerAdapter.onChange).toHaveBeenCalledWith(lastPage);
  });
});
