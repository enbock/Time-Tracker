import Component from '../../Shared/LiveJSX';

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

}

export default MainMenu;
