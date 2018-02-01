import Component from '../../Shared/LiveJSX';
import PropTypes from 'prop-types';
import emptyFunction from 'fbjs/lib/emptyFunction';

/**
 * The Main menu.
 *
 * This menu should show the menu button.
 * Also it contain the menu menu which appear on left side.
 */
class Main extends Component {
  /**
   * Place of main menu layout.
   * @returns {string}
   */
  static get template() {
    return '/Template/Menu/Main.html.tpl';
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
      Main.defaultAdapter,
      props.adapter
    );

    this.boundToggleMenu        = this.toggleMenu.bind(this);
    this.boundMenuSettingsClick = this.onMenuClick.bind(this, 'settings');

    this.languageAdapter = {
      onChange:  this.onLanguageChange.bind(this),
      getDomain: () => 'Menu/Main'
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
   * Supported property types.
   */
  static get propTypes() {
    return {
      lang:    PropTypes.object.isRequired,
      adapter: PropTypes.object,
      onMenu:  PropTypes.func
    };
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
   * Draw component after language loaded.
   *
   * @param {string} language
   */
  onLanguageChange(language) {
    this.setState({language: language});
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
  onTemplateMounted() {
    this.refs.settingsMenu.addEventListener('click', this.boundMenuSettingsClick);
    this.adapter.registerMenuToggleHandler(this.boundToggleMenu);
  }

  /**
   * Setup language on mount.
   */
  componentWillMount() {
    super.componentWillMount();
    this.lang = this.props.lang.setup(this.languageAdapter);
  }

  /**
   * Release interaction connections.
   */
  componentWillUnmount() {
    this.refs.settingsMenu.removeEventListener('click', this.boundMenuSettingsClick);
    this.adapter.deregisterMenuToggleHandler(this.boundToggleMenu);
  }
}

export default Main;
