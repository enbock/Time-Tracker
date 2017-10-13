import Component from '../../Shared/LiveJSX';
import PropTypes from 'prop-types';
import emptyFunction from 'fbjs/lib/emptyFunction';

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
      adapter:   PropTypes.object,
      onMenu:    PropTypes.func
    };
  }

  /**
   * Default adapter to interact with outer world.
   *
   * @returns {Object}
   */
  static get defaultAdapter() {
    return {
      registerMenuToggleHandler:   emptyFunction,
      deregisterMenuToggleHandler: emptyFunction
    };
  }

  /**
   * Constructor.
   *
   * @param {Object} props
   * @param {Object} context
   * @param {Object} updater
   */
  constructor(props, context, updater) {
    super(props, context, updater);

    Object.assign(
      this.state,
      {
        open: false
      }
    );

    /**
     * @type {MainMenu.defaultAdapter}
     */
    this.adapter = Object.assign(
      MainMenu.defaultAdapter,
      props.adapter
    );

    this.boundToggleMenu        = this.toggleMenu.bind(this);
    this.boundMenuSettingsClick = this.onMenuClick.bind(this, 'settings');
  }

  /**
   * Menu state toggle.
   */
  toggleMenu() {
    this.setState({open: !this.state.open});
  }

  /**
   * Close menu.
   */
  closeMenu() {
    this.setState({open: false});
  }

  /**
   * Menu click proxy.
   *
   * @param {string} menu
   */
  onMenuClick(menu) {
    if (this.props.onMenu) {
      this.props.onMenu(menu);
    }
    this.closeMenu();
  }

  /**
   * Connect low level events and adapter interactions.
   *
   * *Notice:* MDC Drawer caches the event, so take them from low level.
   */
  onTemplateMounted(domNode) {
    this.refs.settingsMenu.addEventListener('click', this.boundMenuSettingsClick);
    this.adapter.registerMenuToggleHandler(this.boundToggleMenu);
  }

  /**
   * Release interaction connections.
   */
  componentWillUnmount() {
    this.refs.settingsMenu.removeEventListener('click', this.boundMenuSettingsClick);
    this.adapter.deregisterMenuToggleHandler(this.boundToggleMenu);
  }
}

export default MainMenu;
