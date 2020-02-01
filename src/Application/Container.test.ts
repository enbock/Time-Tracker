import LanguageContainer from '../Language/Container';
import Container from './Container';
import ApplicationPresenter from './View/Application/ApplicationPresenter';

describe('Application.Container', () => {
  it('Get shared objects', () => {
    expect(Container.language).toEqual(LanguageContainer);
    expect(Container.applicationPresenter).toBeInstanceOf(ApplicationPresenter);
  })
});