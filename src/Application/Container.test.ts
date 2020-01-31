import Container from './Container';
import ModelFactory from './Model/ModelFactory';
import ApplicationPresenter from './Presenter/ApplicationPresenter';

describe('Application.Container', () => {
  it('Get shared objects', () => {
    expect(Container.modelFactory).toBeInstanceOf(ModelFactory);
    expect(Container.applicationPresenter).toBeInstanceOf(ApplicationPresenter);
  })
});