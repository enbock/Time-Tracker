import PropTypes from 'prop-types';
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
   * Define properties.
   * @returns {Object}
   */
  static get propTypes() {
    return {
      onThemesChange: PropTypes.func.isRequired
    };
  }

  /**
   * On Selection change.
   *
   * @param {Object} event
   *
   * @see ../Shared/Select.onChange
   */
  onSelectionChange(event) {
    switch (event.name) {
      case 'color':
        this.props.onThemesChange(event.value);
        break;
      default:
        break;
    }
  }
}


export default Settings;
