import PropTypes from 'prop-types';
import Component from '../Shared/LiveJSX';
import LanguageChangeRequest from './Language/Interactor/Change/Request';
import LanguageChangeResponse from './Language/Interactor/Change/Response';
import ThemeChangeRequest from './Themes/Interactor/Change/Request';
import ThemeChangeResponse from './Themes/Interactor/Change/Response';
import View from './View';

export default class Settings extends Component {
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
   * @returns {Object}
   */
  static get propTypes() {
    return Object.assign(
      super.propTypes,
      {
        /**
         * @type {Change}
         */
        themeChangeInteractor: PropTypes.object.isRequired,
        /**
         * @type {Change}
         */
        languageChangeInteractor: PropTypes.object.isRequired,
        /**
         * @type {Presenter}
         */
        settingsPresenter: PropTypes.object.isRequired
      }
    );
  }

  /**
   * @param {Object} event
   *
   * @see ../Shared/Select.onChange
   */
  onSelectionChange(event) {
    switch (event.name) {
      case 'color':
        this.changeTheme(event.value);
        break;
      case 'language':
        this.changeLanguage(event.value);
        break;
      default:
        break;
    }
  }

  /**
   * @param {string} newTheme
   */
  changeTheme(newTheme) {
    const request = new ThemeChangeRequest(newTheme);
    const response = new ThemeChangeResponse();

    this.props.themeChangeInteractor.interact(request, response);
  }

  /**
   * @param {string} newLanguage
   */
  changeLanguage(newLanguage) {
    const request = new LanguageChangeRequest(newLanguage);
    const response = new LanguageChangeResponse();

    this.props.languageChangeInteractor.interact(request, response);
  }
}
