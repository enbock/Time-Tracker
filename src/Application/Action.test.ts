import RouterRegistry from '@enbock/application-router/Registry';
import Router, {IPageData} from '@enbock/application-router/Router';
import {IObserver, IObserverAdapter} from '@enbock/state-value-observer/Observer';
import Action from './Action';
import {IModulePageData} from './Application';
import ModuleLoader from './ModuleLoader';

describe(Action, function (): void {
  let menuOpenState: IObserver<boolean>,
    routerObserver: IObserver<IPageData | null>,
    router: Router,
    routerRegistry: RouterRegistry,
    routerAdapter: IObserverAdapter<IPageData | null>,
    moduleLoader: ModuleLoader
  ;

  beforeEach(() => {
    menuOpenState = {
      value: false
    };
    router = jest.genMockFromModule<Router>('@enbock/application-router/Router');
    routerRegistry = jest.genMockFromModule<RouterRegistry>('@enbock/application-router/Registry');
    moduleLoader = jest.genMockFromModule<ModuleLoader>('./ModuleLoader');
    routerAdapter = {
      onChange: jest.fn()
    };
    routerObserver = {
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
      name: 'name',
      baseUrl: 'rootUrl',
      currentUrl: 'url'
    };
    routerRegistry.getPages = jest.fn().mockReturnValue([page]);
    router.changePage = jest.fn();
    menuOpenState.value = true;

    action.adapter.onMenu('name');
    expect(router.changePage).toHaveBeenCalledWith(page);
    expect(menuOpenState.value).toBeFalsy();
  });

  it('Change to not registered page will be ignored', function (): void {
    const action: Action = createTestObject();
    const page: IPageData = {
      name: 'name',
      baseUrl: 'rootUrl',
      currentUrl: 'url'
    };
    routerRegistry.getPages = jest.fn().mockReturnValue([page]);
    router.changePage = jest.fn();
    menuOpenState.value = true;

    action.adapter.onMenu('notRegistered');
    expect(router.changePage).not.toHaveBeenCalled();
    expect(menuOpenState.value).toBeTruthy();
  });

  it('Load module on page change', async () => {
    const action: Action = createTestObject();
    const page: IModulePageData = {
      module: './New/Module',
      name: 'name',
      baseUrl: 'rootUrl',
      currentUrl: 'url'
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

    const homePage: IModulePageData = {
      name: 'home',
      baseUrl: './',
      currentUrl: './',
      module: './HelloWorld'
    };
    expect(routerRegistry.registerPage).toBeCalledWith(homePage);
    expect(routerRegistry.registerPage).toBeCalledWith({
      name: 'settings',
      baseUrl: './settings/',
      currentUrl: './settings/',
      module: './Settings/Settings'
    });
    expect(router.changePage).toBeCalledWith(homePage);
  });

  it('Load page config and initialize module loader with last page', () => {
    const homePage: IModulePageData = {
      name: 'home',
      baseUrl: './',
      currentUrl: './',
      module: './HelloWorld'
    };
    const lastPage: IModulePageData = {
      name: 'settings',
      baseUrl: './settings/',
      currentUrl: './settings/',
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
