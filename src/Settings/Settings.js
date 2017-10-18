import React from 'react';
import Component from '../Shared/LiveJSX';

/**
 * Option screen primary component.
 */
class Settings extends Component {

  /**
   * Define template of this component.
   * @returns {string}
   */
  static get template() {
    return '/Template/Settings.html.tpl';
  }

  /**
   * On Selection change.
   *
   * @param {Object} event
   *
   * @see ../Shared/Select.onChange
   */
  onSelectionChange(event) {
  }
}


export default Settings;
