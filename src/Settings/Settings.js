import PropTypes from 'prop-types';
import Component from '../Shared/LiveJSX';
import ThemeChangeRequest from './Themes/Interactor/Change/Request';
import ThemeChangeResponse from './Themes/Interactor/Change/Response';

class Settings extends Component {
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
        language: props.lang.language
      }
    );
    this.languageAdapter = {
      onChange: this.onLanguageLoaded.bind(this),
      getDomain: () => 'Settings'
    };
    this.lang = props.lang.setup(this.languageAdapter);
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
       * @type {Manager}
       */
      lang: PropTypes.object.isRequired,
      /**
       * @type {Change}
       */
      themeChangeInteractor: PropTypes.object.isRequired
    };
  }

  /**
   * @param {string} language
   */
  onLanguageLoaded(language) {
    this.setState({language: language});
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

    if(response.isChanged) {
      // TODO Temporally...will move away
      this.props.themesManager.adapter.onThemeChange(response.theme, response.file);
    }
  }
}


export default Settings;
