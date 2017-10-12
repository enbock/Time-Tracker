import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';
import registerServiceWorker from './registerServiceWorker';
import './bootstrap';

registerServiceWorker();

ReactDOM.render(<Application />, document.getElementById('root'));
