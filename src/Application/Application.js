import Component from '../Shared/LiveJSX';

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
}

export default Application;
