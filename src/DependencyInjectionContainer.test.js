import DependencyInjectionContainer from './DependencyInjectionContainer';

describe('Dependency Injection Container', function testContainer() {
  it('Creates', function testCreation() {
    const container = new DependencyInjectionContainer();
    expect(Object.keys(container).length).toBeGreaterThan(0);
  });
});
