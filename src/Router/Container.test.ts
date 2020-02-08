import Container from './Container';
import Registry from './Registry';
import Router from './Router';

describe('Router.Container', () => {
  it('Get shared objects', () => {
    expect(Container.router).toBeInstanceOf(Router);
    expect(Container.registry).toBeInstanceOf(Registry);
  });
});