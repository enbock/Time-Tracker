import ListenerAdapter from '../Observer/ListenerAdapter';
import Observer from '../Observer/Observer';
import DataStorage from '../Storage/DataStorage';
import ThemesManager from './ThemesManager';
import ThemesRegistry, {Theme} from './ThemesRegistry';

class Container {
  registry: ThemesRegistry;
  currentThemeAdapter: ListenerAdapter<Theme>;
  currentTheme: Observer<Theme>;
  manager: ThemesManager;
  storage: DataStorage;

  constructor() {
    this.storage = new DataStorage('theme', window.localStorage);
    this.registry = new ThemesRegistry();
    this.currentThemeAdapter = new ListenerAdapter<Theme>();
    this.currentTheme = new Observer<Theme>(
      this.storage.loadData<Theme>(
        'currentTheme',
        {
          isBuildIn: true,
          name: 'Google',
          url: 'Theme/Google'
        }
      ),
      this.storage.attach<Theme>('currentTheme', this.currentThemeAdapter)
    );
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
  }
}

export default new Container();