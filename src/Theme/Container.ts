import ListenerAdapter from '../Observer/ListenerAdapter';
import Observer from '../Observer/Observer';
import ThemesManager from './ThemesManager';
import ThemesRegistry, {Theme} from './ThemesRegistry';

class Container {
  registry: ThemesRegistry;
  currentThemeAdapter: ListenerAdapter<Theme>;
  currentTheme: Observer<Theme>;
  manager: ThemesManager;

  constructor() {
    this.registry = new ThemesRegistry();
    this.currentThemeAdapter = new ListenerAdapter<Theme>();
    this.currentTheme = new Observer<Theme>(this.registry.getTheme('unknown'), this.currentThemeAdapter);
    this.manager = new ThemesManager(this.currentTheme, this.registry);

    this.setupDefaults();
  }

  protected setupDefaults(): void {
    this.registry.registerTheme({
      isBuildIn: true,
      name: 'Google',
      url: 'Theme/Google'
    });
    this.registry.registerTheme({
      isBuildIn: true,
      name: 'Codefrog',
      url: 'Theme/Codefrog'
    });
    this.manager.changeTheme('Google');
  }
}

export default new Container();