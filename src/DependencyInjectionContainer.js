import emptyFunction from 'fbjs/lib/emptyFunction';
import MenuRegisterManager from './Menu/RegisterManager';
import LanguageChangeInteractor from './Settings/Language/Interactor/Change';
import LanguageManager from './Settings/Language/Manager';
import SettingsPresenter from './Settings/Presenter';
import ThemeChangeInteractor from './Settings/Themes/Interactor/Change';
import ThemesManager from './Settings/Themes/Manager';

export default class DependencyInjectionContainer {
  constructor() {
    this.languageManager = new LanguageManager('de_DE');
    this.languageChangeInteractor = new LanguageChangeInteractor(this.languageManager);
    this.mainMenuRegisterManager = new MenuRegisterManager();
    this.settingsTranslation = this.languageManager.setup(
      {
        getDomain: () => 'Settings',
        onChange: emptyFunction
      }
    );
    this.settingsPresenter = new SettingsPresenter(this.settingsTranslation);
    this.themesManager = new ThemesManager({google: 'Google.css', codefrog: 'Codefrog.css'});
    this.themeChangeInteractor = new ThemeChangeInteractor(this.themesManager);
  }
}
