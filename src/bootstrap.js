import * as MDL from 'react-mdl';
import Application from './Application';
import './material.min.css'; // custom colors

/**
 * Expose MDL for Templates
 */
for(let key in MDL) {
  global[key] = MDL[key];
}

/**
 * Expose Application for Templates
 */
global.Application = Application;

