import PropTypes from 'prop-types';
import Component from '../Shared/LiveJSX';
import ThemeChangeRequest from './Themes/Interactor/Change/Request';
import ThemeChangeResponse from './Themes/Interactor/Change/Response';
import View from './View';

class Settings extends Component {
  /**
   * @param {Object} props
   * @param {Object} context
   * @param {Object} updater
   */
  constructor(props, context, updater) {
    super(props, context, updater);
    this.view = new View();
  }

  /**
   * @returns {string}
   */
  static get template() {
    return '/Template/Settings.html.tpl';
  }

  /**
   * @returns {Object}
   */
  static get propTypes() {
    return {
      /**
       * @type {Change}
       */
      themeChangeInteractor: PropTypes.object.isRequired,
      /**
       * @type {Presenter}
       */
      settingsPresenter: PropTypes.object.isRequired
    };
  }

  /**
   * @param {Object} event
   *
   * @see ../Shared/Select.onChange
   */
  onSelectionChange(event) {
    switch (event.name) {
      case 'color':
        this.switchTheme(event.value);
        break;
      case 'language':
        this.props.lang.change(event.value);
        break;
      default:
        break;
    }
  }

  /**
   * @param {string} newTheme
   */
  switchTheme(newTheme) {
    const request = new ThemeChangeRequest(newTheme);
    const response = new ThemeChangeResponse();

    this.props.themeChangeInteractor.interact(request, response);

    if (response.isChanged) {
      this.view = this.props.settingsPresenter.present(response, 'TODO');
      this.setState({view: this.view});

      // TODO Temporally...will move away
      this.props.themesManager.adapter.onThemeChange(response.theme, response.file);
    }
  }
}


export default Settings;
