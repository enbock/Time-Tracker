import {Observer} from '@enbock/state-value-observer/ValueObserver';
import ThemesManager from './ThemesManager';
import ThemesRegistry, {Theme} from './ThemesRegistry';

describe('Theme.ThemeManager', () => {
  let observer: Observer<Theme>, getThemeSpy: jest.Mock, manager: ThemesManager;

  beforeEach(() => {
    observer = {
      value: {
        isBuildIn: true,
        name: 'old',
        url: 'old'
      }
    };
    const registry: ThemesRegistry = new ThemesRegistry();
    getThemeSpy = jest.fn();
    registry.getTheme = getThemeSpy;
    manager = new ThemesManager(observer, registry);
  });

  it('Can change the active theme', () => {
    const newTheme: Theme = {
      isBuildIn: false,
      name: 'new',
      url: 'new'
    };
    getThemeSpy.mockReturnValue(newTheme);
    manager.changeTheme('new');

    expect(getThemeSpy).toBeCalledWith('new');
    expect(observer.value).toBe(newTheme);
  });
});
