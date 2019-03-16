import PropTypes from 'prop-types';
import Component from '../Shared/LiveJSX';

export default class Main extends Component {
  /**
   * @param {Object} props
   * @param {Object} context
   * @param {Object} updater
   */
  constructor(props, context, updater) {
    super(props, context, updater);

    Object.assign(this.state, {open: false});

    this.boundToggleMenu = this.toggleMenu.bind(this);
    this.boundMenuSettingsClick = this.onMenuClick.bind(this, 'settings');

    this.view = {labels:{}}; // TODO presenter
  }

  static get propTypes() {
    return Object.assign(
      super.propTypes,
      {
        /**
         * @type {Menu.RegisterManager}
         */
        mainMenuRegisterManager: PropTypes.object.isRequired
      }
    );
  }

  toggleMenu() {
    this.setState({open: !this.state.open});
  }

  closeMenu() {
    this.setState({open: false});
  }

  /**
   * @param {string} menu
   */
  onMenuClick(menu) {
    this.props.mainMenuRegisterManager.change(menu);
    this.closeMenu();
  }

  onTemplateMounted() {
    this.refs.settingsMenu.addEventListener('click', this.boundMenuSettingsClick);
    this.props.mainMenuRegisterManager.registerMenuToggleHandler(this.boundToggleMenu);
  }

  componentWillUnmount() {
    this.refs.settingsMenu.removeEventListener('click', this.boundMenuSettingsClick);
    this.props.mainMenuRegisterManager.deregisterMenuToggleHandler(this.boundToggleMenu);
  }
}