import Container from './Container';

describe('Theme.Container', () => {
  it('Get shared objects', () => {
    expect(Container.registry.getTheme('Google').name).toBe('Google');
  });
});