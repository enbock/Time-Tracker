import LanguageContainer from '../Language/Container';
import Observer from '../Observer/Observer';
import ApplicationAction from './ApplicationAction';
import Container from './Container';
import Presenter from './View/Application/Presenter';

describe('Application.Container', () => {
  it('Get shared objects', () => {
    Container.menuOpenStateAdapter.onChange(false, true);

    expect(Container.language).toEqual(LanguageContainer);
    expect(Container.applicationPresenter).toBeInstanceOf(Presenter);
    expect(Container.applicationAction).toBeInstanceOf(ApplicationAction);
    expect(Container.menuOpenState).toBeInstanceOf(Observer);
  });
});