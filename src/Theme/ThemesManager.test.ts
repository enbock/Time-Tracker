import {IObserver} from '../Observer/Observer';
import ThemesManager from './ThemesManager';
import ThemesRegistry, {Theme} from './ThemesRegistry';

describe('Theme.ThemeManager', () => {
  let observer: IObserver<Theme>, onChangeSpy: jest.Mock, getThemeSpy: jest.Mock, manager: ThemesManager;

  beforeEach(() => {
    onChangeSpy = jest.fn();
    observer = {
      adapter: {onChange: onChangeSpy},
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