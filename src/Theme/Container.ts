import DataStorage from '@enbock/simple-storage/DataStorage';
import ListenerAdapter from '@enbock/state-value-observer/ListenerAdapter';
import ValueObserver from '@enbock/state-value-observer/ValueObserver';
import ThemesManager from './ThemesManager';
import ThemesRegistry, {Theme} from './ThemesRegistry';

class Container {
  registry: ThemesRegistry;
  currentThemeAdapter: ListenerAdapter<Theme>;
  currentTheme: ValueObserver<Theme>;
  manager: ThemesManager;
  storage: DataStorage;

  constructor() {
    this.storage = new DataStorage('theme', window.localStorage);
    this.registry = new ThemesRegistry();
    this.currentThemeAdapter = new ListenerAdapter<Theme>();
    this.currentTheme = new ValueObserver<Theme>(
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
