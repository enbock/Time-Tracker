import PropTypes from 'prop-types';
import Component from '../../Shared/LiveJSX';

class Main extends Component {
  /**
   * @param {Object} props
   * @param {Object} context
   * @param {Object} updater
   */
  constructor(props, context, updater) {
    super(props, context, updater);

    Object.assign(
      this.state,
      {
        open: false,
        language: props.lang.language
      }
    );

    this.boundToggleMenu = this.toggleMenu.bind(this);
    this.boundMenuSettingsClick = this.onMenuClick.bind(this, 'settings');

    this.languageAdapter = {
      onChange: this.onLanguageChange.bind(this),
      getDomain: () => 'Menu/Main'
    };
    this.lang = props.lang.setup(this.languageAdapter);
  }

  /**
   * @returns {string}
   */
  static get template() {
    return '/Template/Menu/Main.html.tpl';
  }

  static get propTypes() {
    return {
      lang: PropTypes.object.isRequired,
      /**
       * @type {Menu.RegisterManager}
       */
      mainMenuRegisterManager: PropTypes.object.isRequired
    };
  }

  toggleMenu() {
    this.setState({open: !this.state.open});
  }

  closeMenu() {
    this.setState({open: false});
  }

  /**
   * @param {string} language
   */
  onLanguageChange(language) {
    this.setState({language: language});
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

export default Main;
