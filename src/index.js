import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';
import './bootstrap';
import DependencyInjectionContainer from './DependencyInjectionContainer';
import Menu from './Menu';
import registerServiceWorker from './registerServiceWorker';
import Settings from './Settings/Settings';
import SettingsThemesStyle from './Settings/Themes/Style';
import Style from './Shared/Style';

registerServiceWorker();
const container = new DependencyInjectionContainer();

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
  const mainMenu = <Menu.Main
    lang={container.languageManager}
    mainMenuRegisterManager={container.mainMenuRegisterManager}
  />;

  const routeComponents = {
    settings:
      <Settings
        themeChangeInteractor={container.themeChangeInteractor}
        languageChangeInteractor={container.languageChangeInteractor}
        settingsPresenter={container.settingsPresenter}
      />
  };

  ReactDOM.render(
    [
      <Style key="MDCStyle" src="/Style/google.css" />,
      <Style key="CoreStyle" src="/Style/material-components-web.min.css" />,
      <SettingsThemesStyle key="ThemeStyle" themesManager={container.themesManager} />,
      <Application
        key="Application"
        routeComponents={routeComponents}
        mainMenuRegisterManager={container.mainMenuRegisterManager}
        mainMenu={mainMenu}
      />
    ],
    document.getElementById('root')
  );
}
