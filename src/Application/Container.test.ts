import LanguageContainer from '../Language/Container';
import Container from './Container';
import Presenter from './View/Application/Presenter';

describe('Application.Container', () => {
  it('Get shared objects', () => {
    expect(Container.language).toEqual(LanguageContainer);
    expect(Container.applicationPresenter).toBeInstanceOf(Presenter);
  })
});