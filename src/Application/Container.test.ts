import LanguageContainer from '../Language/Container';
import Observer from '../Observer/Observer';
import RouterContainer from '../Router/Container';
import Action from './Action';
import Container from './Container';
import ModuleLoader from './ModuleLoader';
import Presenter from './View/Application/Presenter';

jest.mock('./ModuleLoader');
jest.mock('../Language/Container', () => ({changeLanguageSetup: {interact: jest.fn().mockResolvedValue(null)}}));
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
    Container.menuOpenStateAdapter.onChange(false, true);

    expect(Container.language).toEqual(LanguageContainer);
    expect(LanguageContainer.changeLanguageSetup.interact).toBeCalledWith({languageCode: 'de-de'}, {});
    expect(Container.applicationPresenter).toBeInstanceOf(Presenter);
    expect(Container.applicationAction).toBeInstanceOf(Action);
    expect(Container.menuOpenState).toBeInstanceOf(Observer);
    expect(Container.moduleLoader).toBeInstanceOf(ModuleLoader);
    expect(RouterContainer.registry.registerPage).toBeCalledTimes(2);
    expect(RouterContainer.router.initialize).toBeCalled();
    expect(RouterContainer.adapter.addListener).toBeCalledWith(Container.applicationActionAdapter.onPageChanged);
  });
});