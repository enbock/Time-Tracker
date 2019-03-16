import emptyFunction from 'fbjs/lib/emptyFunction';
import YAML from 'yamljs';
import MenuRegisterManager from './Menu/RegisterManager';
import LanguageApi from './Settings/Language/API/Ajax';
import YamlConverter from './Settings/Language/API/YamlConverter';
import LanguageChangeInteractor from './Settings/Language/Interactor/Change';
import LanguageManager from './Settings/Language/Manager';
import TranslatorFactory from './Settings/Language/Translator/Factory';
import SettingsPresenter from './Settings/Presenter';
import ThemeChangeInteractor from './Settings/Themes/Interactor/Change';
import ThemesManager from './Settings/Themes/Manager';
import LiveJsxAPI from './Shared/LiveJSX/API/Ajax';
import Babel from './Shared/LiveJSX/API/Babel';

export default class DependencyInjectionContainer {
  constructor() {
    const publicUrl = process.env.PUBLIC_URL || '';

    this.babel = new Babel({presets: ['react']});
    this.templateLoader = new LiveJsxAPI(publicUrl, this.babel);
    this.translatorApi = new LanguageApi(publicUrl);
    this.translatorConverter = new YamlConverter(YAML);
    this.translatorFactory = new TranslatorFactory(this.translatorApi, this.translatorConverter);
    this.languageManager = new LanguageManager('de_DE', this.translatorFactory);
    this.languageChangeInteractor = new LanguageChangeInteractor(this.languageManager);
    this.mainMenuRegisterManager = new MenuRegisterManager();
    this.settingsTranslation = this.languageManager.setup(
      {
        getDomain: () => 'Settings',
        onChange: emptyFunction
      }
    );
    this.mainMenuTranslation = this.languageManager.setup(
      {
        getDomain: () => 'Menu/Main',
        onChange: emptyFunction
      }
    );
    this.settingsPresenter = new SettingsPresenter(this.settingsTranslation);
    this.themesManager = new ThemesManager({google: 'Google.css', codefrog: 'Codefrog.css'});
    this.themeChangeInteractor = new ThemeChangeInteractor(this.themesManager);
  }
}
