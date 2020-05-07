import LanguageContainer from '../Language/Container';
import Observer from '../Observer/Observer';
import RouterContainer from '../Router/Container';
import Action from './Action';
import Application from './Application';
import Container from './Container';
import ModuleLoader from './ModuleLoader';
import Presenter from './View/Application/Presenter';

jest.mock('./ModuleLoader');
jest.mock(
  '../Language/Container',
  () => ({
    setupDefaults: jest.fn(),
    adapter: {addListener: jest.fn()}
  })
);
jest.mock(
  '../Router/Container',
  () => ({
    registry: {
      registerPage: jest.fn()
    },
    router: {initialize: jest.fn()},
    adapter: {addListener: jest.fn()}
  })
);

describe('Application.Container', () => {
  it('Get shared objects', () => {
    Container.menuOpenStateAdapter.onChange(true);

    expect(Container.language).toEqual(LanguageContainer);
    expect(Container.applicationPresenter).toBeInstanceOf(Presenter);
    expect(Container.applicationAction).toBeInstanceOf(Action);
    expect(Container.menuOpenState).toBeInstanceOf(Observer);
    expect(Container.moduleLoader).toBeInstanceOf(ModuleLoader);
    expect(Container.application).toBeInstanceOf(Application);
    expect(RouterContainer.registry.registerPage).toHaveBeenCalledTimes(2);
    expect(RouterContainer.router.initialize).toHaveBeenCalled();
    expect(RouterContainer.adapter.addListener).toHaveBeenCalledWith(Container.applicationActionAdapter.onPageChanged);
    expect(LanguageContainer.adapter.addListener).toHaveBeenCalled();
  });
});
