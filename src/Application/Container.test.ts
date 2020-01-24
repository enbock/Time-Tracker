import Container from './Container';
import ModelFactory from './Model/ModelFactory';

describe('Application.Container', () => {
  it('Get shared objects', () => {
    expect(Container.ModelFactory).toBeInstanceOf(ModelFactory);
  })
});