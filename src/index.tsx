import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';
import Style from './Style/Style';

ReactDOM.render(
  <React.Fragment>
    <Style source="material-components-web.min" />
    <Style source="material-components-web.icons" />
    <Application />
  </React.Fragment>,
  document.getElementById('root')
);