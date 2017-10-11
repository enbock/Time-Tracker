import Component from '../../Shared/LiveJSX';
import {MDCTemporaryDrawer} from '@material/drawer';

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
   * Abstract function for JSX mount info.
   *
   * @param {HTMLElement} domNode
   */
  onTemplateMounted(domNode) {
    this.drawer = new MDCTemporaryDrawer(domNode);
  }

  componentWillUpdate(nextProps, nextContext) {
    if (this.drawer) {
      this.drawer.open = nextProps.open;
    }
  }
}

export default MainMenu;
