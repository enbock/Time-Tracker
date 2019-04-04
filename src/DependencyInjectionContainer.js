import emptyFunction from 'fbjs/lib/emptyFunction';
import YAML from 'yamljs';
import ApplicationPresenter from './Application/Presenter';
import MainMenuPresenter from './Menu/Main/Presenter';
import MenuRegisterManager from './Menu/RegisterManager';
import LanguageApi from './Settings/Language/API/Ajax';
import YamlConverter from './Settings/Language/API/YamlConverter';
import LanguageChangeInteractor from './Settings/Language/Interactor/Change';
import LanguageSetupInteractor from './Settings/Language/Interactor/Setup';
import LanguageManager from './Settings/Language/Manager';
import TranslatorFactory from './Settings/Language/Translator/Factory';
import SettingsPresenter from './Settings/Presenter';
import ThemeChangeInteractor from './Settings/Themes/Interactor/Change';
import ThemeSetupInteractor from './Settings/Themes/Interactor/Setup';
import ThemesManager from './Settings/Themes/Manager';
import LiveJsxAPI from './Shared/LiveJSX/API/Ajax';
import Babel from './Shared/LiveJSX/API/Babel';
import ValueChangeHandler from './Shared/ValueChangeHandler';

export default class DependencyInjectionContainer {
  constructor() {
    const publicUrl = process.env.PUBLIC_URL || '';

    this.babel = new Babel({presets: ['react']});
    this.templateLoader = new LiveJsxAPI(publicUrl, this.babel);

    this.languageChangeHandler = new ValueChangeHandler('de_DE');
    this.translatorApi = new LanguageApi(publicUrl);
    this.translatorConverter = new YamlConverter(YAML);
    this.translatorFactory = new TranslatorFactory(
      this.translatorApi,
      this.translatorConverter,
      this.languageChangeHandler
    );
    this.languageManager = new LanguageManager(this.translatorFactory, this.languageChangeHandler);
    this.themesManager = new ThemesManager({google: 'Google.css', codefrog: 'Codefrog.css'});

    this.mainMenuRegisterManager = new MenuRegisterManager();
    this.applicationTranslation = this.languageManager.setup({getDomain: () => 'Application', onChange: emptyFunction});
    this.applicationPresenter = new ApplicationPresenter(this.applicationTranslation);
    this.mainMenuTranslation = this.languageManager.setup({getDomain: () => 'Menu/Main', onChange: emptyFunction});
    this.mainMenuPresenter = new MainMenuPresenter(this.mainMenuTranslation);
    const settingTranslation = this.languageManager.setup({getDomain: () => 'Settings', onChange: emptyFunction});
    this.settings = {
      translation: settingTranslation,
      presenter: new SettingsPresenter(settingTranslation),
      themeChangeInteractor: new ThemeChangeInteractor(this.themesManager),
      themeSetupInteractor: new ThemeSetupInteractor(this.themesManager),
      languageChangeInteractor: new LanguageChangeInteractor(this.languageManager),
      languageSetupInteractor: new LanguageSetupInteractor(this.languageChangeHandler)
    };
  }
}
