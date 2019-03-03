import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';
import './bootstrap';
import Menu from './Menu';
import registerServiceWorker from './registerServiceWorker';
import Settings from './Settings';
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
  const languageManager = new Settings.Language.Manager('de_DE');
  const themesManager = new Settings.Themes.Manager({google: 'Google.css', codefrog: 'Codefrog.css'});
  const mainMenuRegisterManager = new Menu.RegisterManager();
  const mainMenu = <Menu.Main lang={languageManager} mainMenuRegisterManager={mainMenuRegisterManager} />;

  const routeComponents = {
    settings:
      <Settings
        lang={languageManager}
        themesManager={themesManager}
      />
  };

  ReactDOM.render(
    [
      <Style key="MDCStyle" src="/Style/google.css" />,
      <Style key="CoreStyle" src="/Style/material-components-web.min.css" />,
      <Settings.Themes.Style key="ThemeStyle" themesManager={themesManager} />,
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
