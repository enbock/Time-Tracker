import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';
import './bootstrap';
import DependencyInjectionContainer from './DependencyInjectionContainer';
import Main from './Menu/Main';
import registerServiceWorker from './registerServiceWorker';
import Settings from './Settings/Settings';
import SettingsThemesStyle from './Settings/Themes/Style';
import Style from './Shared/Style';

global.React = React;
registerServiceWorker();
const container = new DependencyInjectionContainer();

fetch(process.env.PUBLIC_URL + '/lib/babel.min.js')
  .then(response => response.text())
  .then(
    data => {
      // eslint-disable-next-line
      const babel = new Function(data);
      babel.apply(container.babel);

      startApplication();
    }
  )
;

function startApplication() {
  const mainMenu = <Main
    template="/Template/Menu/Main.html.tpl"
    templateLoader={container.templateLoader}
    lang={container.languageManager}
    mainMenuRegisterManager={container.mainMenuRegisterManager}
    presenter={container.mainMenuPresenter}
    redrawAdapter={container.mainMenuTranslation.adapter}
  />;

  const routeComponents = {
    settings:
      <Settings
        template="/Template/Settings.html.tpl"
        templateLoader={container.templateLoader}
        themeChangeInteractor={container.settings.themeChangeInteractor}
        themeSetupInteractor={container.settings.themeSetupInteractor}
        languageChangeInteractor={container.settings.languageChangeInteractor}
        languageSetupInteractor={container.settings.languageSetupInteractor}
        settingsPresenter={container.settings.presenter}
        redrawAdapter={container.settings.translation.adapter}
      />
  };

  ReactDOM.render(
    [
      <Style key="MDCStyle" src="/Style/google.css" />,
      <Style key="CoreStyle" src="/Style/material-components-web.min.css" />,
      <SettingsThemesStyle key="ThemeStyle" themesManager={container.themesManager} />,
      <Application
        template="/Template/Application.html.tpl"
        templateLoader={container.templateLoader}
        key="Application"
        routeComponents={routeComponents}
        mainMenuRegisterManager={container.mainMenuRegisterManager}
        mainMenu={mainMenu}
        presenter={container.applicationPresenter}
        redrawAdapter={container.applicationTranslation.adapter}
      />
    ],
    document.getElementById('root')
  );
}
