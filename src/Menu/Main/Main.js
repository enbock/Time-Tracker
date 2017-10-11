import Component from '../../Shared/LiveJSX';
import PropTypes from 'prop-types';

/**
 * The Main menu.
 *
 * This menu should show the menu button.
 * Also it contain the menu menu which appear on left side.
 */
class MainMenu extends Component
{
  /**
   * Place of main menu layout.
   * @returns {string}
   */
  static get template() {
    return '/Template/Menu/Main.html.tpl';
  }

  /**
   * Supported property types.
   */
  static get propTypes() {
    return {
      className: PropTypes.string.isRequired,
      onOpen:    PropTypes.func,
      onClose:   PropTypes.func,
      open:      PropTypes.bool
    };
  }

  /**
   * Proxy open event, if bound.
   * @param event
   */
  onOpen(event) {
    if (this.props.onOpen) {
      this.props.onOpen(event);
    }
  }

  /**
   * Proxy close event, if bound.
   * @param event
   */
  onClose(event) {
    if (this.props.onClose) {
      this.props.onClose(event);
    }
  }
}

export default MainMenu;
