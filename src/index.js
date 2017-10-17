import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';
import registerServiceWorker from './registerServiceWorker';
import Axios from 'axios';
import './bootstrap';

registerServiceWorker();

Axios.get(process.env.PUBLIC_URL + '/lib/babel.min.js')
  .then(
    response => {
      const babel = new Function(response.data);
      babel.apply(global);
      ReactDOM.render(<Application/>, document.getElementById('root'));
    }
  )
;
