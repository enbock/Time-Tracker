import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application/View/Application';
import ApplicationView from './Application/View/Model/ApplicationView';

const view: ApplicationView = new ApplicationView();
view.compiler = 'TypeScript';
view.framework = 'React and Uncle Bob';

ReactDOM.render(
  <Application view={view} />,
  document.getElementById('root')
);