import React from 'react';
import Component from '../Shared/LiveJSX';
import {MDCSelect} from '@material/select';

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

  onTemplateMounted(domNode) {
    const select = new MDCSelect(domNode.querySelector('.mdc-select.language'));
    select.listen('MDCSelect:change', () => {
      console.log(`Selected "${select.selectedOptions[0].textContent}" at index ${select.selectedIndex} ` +
            `with value "${select.value}"`);
    });
    const select2 = new MDCSelect(domNode.querySelector('.mdc-select.color'));
    select2.listen('MDCSelect:change', () => {
      console.log(`Selected "${select2.selectedOptions[0].textContent}" at index ${select2.selectedIndex} ` +
            `with value "${select2.value}"`);
    });
  }
}


export default Settings;
