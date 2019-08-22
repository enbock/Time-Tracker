import PropTypes from 'prop-types';
import Component from '../Shared/LiveJSX';
import ReactRedrawMixIn from '../Shared/ReactRedrawMixIn';
import View from './Main/View';

export default class Main extends ReactRedrawMixIn(Component) {
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

    this.view = new View();
  }

  static get propTypes() {
    return Object.assign(
      // eslint-disable-next-line
      super.propTypes,
      {
        /**
         * @type {Menu.RegisterManager}
         */
        mainMenuRegisterManager: PropTypes.object.isRequired,
        /**
         * @type {Main.Presenter}
         */
        presenter: PropTypes.object.isRequired
      }
    );
  }

  onChange() {
    super.onChange();
    this.buildView();
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
    super.onTemplateMounted();
    this.refs.settingsMenu.addEventListener('click', this.boundMenuSettingsClick);
    this.props.mainMenuRegisterManager.registerMenuToggleHandler(this.boundToggleMenu);
    this.buildView();
  }

  componentWillUnmount() {
    this.refs.settingsMenu.removeEventListener('click', this.boundMenuSettingsClick);
    this.props.mainMenuRegisterManager.deregisterMenuToggleHandler(this.boundToggleMenu);
  }

  buildView() {
    this.view = this.props.presenter.present();
    this.setState({view: this.view});
  }
}
