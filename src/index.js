import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';
import './bootstrap';
import registerServiceWorker from './registerServiceWorker';

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
  const router          = {/* TODO Router component */};
  const languageManager = {/* TODO Upgrade Language Manager */};
  const themesManager   = {/* TODO Upgrade Themes Manager */};

  ReactDOM.render(
    <Application router={router} language={languageManager} themes={themesManager}/>,
    document.getElementById('root')
  );
}
