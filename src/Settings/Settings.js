import PropTypes from 'prop-types';
import Component from '../Shared/LiveJSX';
import ReactRedrawMixIn from '../Shared/ReactRedrawMixIn';
import LanguageChangeRequest from './Language/Interactor/Change/Request';
import LanguageChangeResponse from './Language/Interactor/Change/Response';
import LanguageSetupResponse from './Language/Interactor/Setup/Response';
import ThemeChangeRequest from './Themes/Interactor/Change/Request';
import ThemeChangeResponse from './Themes/Interactor/Change/Response';
import ThemeSetupResponse from './Themes/Interactor/Setup/Response';
import View from './View';

export default class Settings extends ReactRedrawMixIn(Component) {
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
         * @type {Setup}
         */
        themeSetupInteractor: PropTypes.object.isRequired,
        /**
         * @type {Change}
         */
        languageChangeInteractor: PropTypes.object.isRequired,
        /**
         * @type {Setup}
         */
        languageSetupInteractor: PropTypes.object.isRequired,
        /**
         * @type {Presenter}
         */
        settingsPresenter: PropTypes.object.isRequired
      }
    );
  }

  onTemplateMounted() {
    super.onTemplateMounted();
    this.loadSetup();
  }

  onChange() {
    super.onChange();
    this.loadSetup();
  }

  loadSetup() {
    const languageResponse = new LanguageSetupResponse();
    const themeResponse = new ThemeSetupResponse();
    let languageResult = false, themeResult = false;

    function checkResults() {
      if (languageResult && themeResult) this.runPresenter(themeResponse, languageResponse);
    }

    this.props.languageSetupInteractor
      .interact(languageResponse)
      .then(() => {
        languageResult = true;
        checkResults.apply(this);
      })
    ;
    this.props.themeSetupInteractor
      .interact(themeResponse)
      .then(() => {
        themeResult = true;
        checkResults.apply(this);
      })
    ;
  }

  runPresenter(themeResponse, languageResponse) {
    this.view = this.props.settingsPresenter.present(themeResponse, languageResponse);
    this.setState({view: this.view});
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

    this.props.themeChangeInteractor.interact(request, response).then();
  }

  /**
   * @param {string} newLanguage
   */
  changeLanguage(newLanguage) {
    const request = new LanguageChangeRequest(newLanguage);
    const response = new LanguageChangeResponse();

    this.props.languageChangeInteractor.interact(request, response).then();
  }
}
