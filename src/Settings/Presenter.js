import View from './View';

export default class Presenter {
  /**
   * @param {Translator} translator
   */
  constructor(translator) {
    this.translator = translator;
  }

  /**
   * @param {Response} themeInteractorResponse
   * @param {Response} languageInteractorResponse
   */
  present(themeInteractorResponse, languageInteractorResponse) {
    const view = new View();

    view.activeTheme = themeInteractorResponse.theme;
    view.activeLanguage = languageInteractorResponse.language;
    view.labels = {
      settingsBoxTitle: this.translator.translate('settingBox.title'),
      colorSelectionTitle: this.translator.translate('settingBox.selection.color.title'),
      languageSelectionTitle: this.translator.translate('settingBox.selection.lang.title'),
      google: this.translator.translate('settingBox.selection.color.google'),
      codefrog: this.translator.translate('settingBox.selection.color.codefrog'),
      german: this.translator.translate('settingBox.selection.lang.german'),
      english: this.translator.translate('settingBox.selection.lang.english'),
      de_DE: this.translator.translate('settingBox.selection.lang.german'),
      en_US: this.translator.translate('settingBox.selection.lang.english')
    };

    return view;
  }
}
