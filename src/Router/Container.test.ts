import Registry from '@enbock/application-router/Registry';
import Router from '@enbock/application-router/Router';
import Container from './Container';

describe('Router.Container', () => {
  it('Get shared objects', () => {
    expect(Container.router).toBeInstanceOf(Router);
    expect(Container.registry).toBeInstanceOf(Registry);
  });
});
