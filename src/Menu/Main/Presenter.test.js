/** global: jest */
import Presenter from './Presenter';
import ThemeInteractorResponse from './Themes/Interactor/Change/Response';
import View from './View';

describe('Settings Presenter', function testSettingsPresenter() {
  it('Aggregate view data', function testAggregation() {
    const themeInteractorResponse = new ThemeInteractorResponse();
    const language = 'language';
    const translator = {
      translate: function (key) {
        const returnMap = {
          'settingBox.title': 'settingsBoxTitle',
          'settingBox.selection.color.title': 'colorSelectionTitle',
          'settingBox.selection.lang.title': 'languageSelectionTitle',
          'settingBox.selection.color.google': 'google',
          'settingBox.selection.color.codefrog': 'codefrog',
          'settingBox.selection.lang.german': 'german',
          'settingBox.selection.lang.english': 'english'
        };

        return returnMap[key];
      }
    };

    const presenter = new Presenter(translator);
    const view = presenter.present(themeInteractorResponse, language);

    const expectedView = new View();
    expectedView.activeTheme = themeInteractorResponse.theme;
    expectedView.activeLanguage = language;
    expectedView.labels = {
      settingsBoxTitle: 'settingsBoxTitle',
      colorSelectionTitle: 'colorSelectionTitle',
      languageSelectionTitle: 'languageSelectionTitle',
      google: 'google',
      codefrog: 'codefrog',
      german: 'german',
      english: 'english',
      de_DE: 'german',
      en_US: 'english'
    };
    expect(view).toEqual(expectedView);
  });
});
