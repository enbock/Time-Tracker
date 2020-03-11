import ThemesRegistry, {Theme} from './ThemesRegistry';

describe('Theme.ThemesRegistry', () => {
  it('Get unknown theme', () => {
    const registry: ThemesRegistry = new ThemesRegistry();
    const expectedTheme: Theme = {
      name: 'Unknown',
      isBuildIn: true,
      url: 'Themes/Unknown'
    };
    expect(registry.getTheme('test')).toEqual(expectedTheme);
  });

  it('Register and get theme', () => {
    const registry: ThemesRegistry = new ThemesRegistry();
    const newTheme: Theme = {
      name: 'test',
      isBuildIn: true,
      url: 'Themes/Test'
    };
    const expectedTheme: Theme = {
      name: 'test',
      isBuildIn: true,
      url: 'Themes/Test'
    };
    registry.registerTheme(newTheme);
    expect(registry.getTheme('test')).toEqual(expectedTheme);
  });
});