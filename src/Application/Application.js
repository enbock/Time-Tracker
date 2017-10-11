import Component from '../Shared/LiveJSX';
import Menu from '../Menu';

/**
 * Root Application.
 */
class Application extends Component {
  /**
   * Define template of component.
   *
   * @returns {string}
   */
  static get template() {
    return '/Template/Application.html.tpl';
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

    this.components = {
      MainMenu: Menu.Main
    };

    this.state = Object.assign(
      this.state,
      {
        menuOpen: false
      }
    );
  }

  /**
   * Set state to menu is closed.
   */
  onMenuClose() {
    this.setState({menuOpen: false});
  }

  /**
   * Toggle open state.
   */
  onMenuButtonClick() {
    this.setState({menuOpen: !this.state.menuOpen});
  }
}

export default Application;
