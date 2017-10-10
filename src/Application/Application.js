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
  }
}

export default Application;
