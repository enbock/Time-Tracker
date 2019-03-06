import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';
import './bootstrap';
import Menu from './Menu';
import registerServiceWorker from './registerServiceWorker';
import LanguageManager from './Settings/Language/Manager';
import SettingsPresenter from './Settings/Presenter';
import Settings from './Settings/Settings';
import ThemeChangeInteractor from './Settings/Themes/Interactor/Change';
import ThemesManager from './Settings/Themes/Manager';
import SettingsThemesStyle from './Settings/Themes/Style';
import Style from './Shared/Style';

registerServiceWorker();

fetch(process.env.PUBLIC_URL + '/lib/babel.min.js')
  .then(response => response.text())
  .then(
    data => {
      // eslint-disable-next-line
      const babel = new Function(data);
      babel.apply(global);

      startApplication();
    }
  )
;

function startApplication() {
  // Injections
  const languageManager = new LanguageManager('de_DE');
  const themesManager = new ThemesManager({google: 'Google.css', codefrog: 'Codefrog.css'});
  const mainMenuRegisterManager = new Menu.RegisterManager();
  const mainMenu = <Menu.Main lang={languageManager} mainMenuRegisterManager={mainMenuRegisterManager} />;

  const themeChangeInteractor = new ThemeChangeInteractor(themesManager);
  const settingsTranslation = languageManager.setup(
    {
      getDomain: () => 'Settings',
      onChange: function TODO() {
      }
    }
  );
  const settingsPresenter = new SettingsPresenter(settingsTranslation);

  const routeComponents = {
    settings:
      <Settings
        lang={languageManager}
        themesManager={themesManager}
        themeChangeInteractor={themeChangeInteractor}
        settingsPresenter={settingsPresenter}
      />
  };

  ReactDOM.render(
    [
      <Style key="MDCStyle" src="/Style/google.css" />,
      <Style key="CoreStyle" src="/Style/material-components-web.min.css" />,
      <SettingsThemesStyle key="ThemeStyle" themesManager={themesManager} />,
      <Application
        key="Application"
        routeComponents={routeComponents}
        mainMenuRegisterManager={mainMenuRegisterManager}
        mainMenu={mainMenu}
      />
    ],
    document.getElementById('root')
  );
}
