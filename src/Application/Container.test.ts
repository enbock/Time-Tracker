import LanguageContainer from '../Language/Container';
import Observer from '../Observer/Observer';
import Action from './Action';
import Container from './Container';
import ModuleLoader from './ModuleLoader';
import Presenter from './View/Application/Presenter';

describe('Application.Container', () => {
  it('Get shared objects', () => {
    Container.menuOpenStateAdapter.onChange(false, true);

    expect(Container.language).toEqual(LanguageContainer);
    expect(Container.applicationPresenter).toBeInstanceOf(Presenter);
    expect(Container.applicationAction).toBeInstanceOf(Action);
    expect(Container.menuOpenState).toBeInstanceOf(Observer);
    expect(Container.moduleLoader).toBeInstanceOf(ModuleLoader);
  });
});