import PropTypes from 'prop-types';
import Component from '../Shared/LiveJSX';

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
       * @type {Themes.Manager}
       */
      themesManager: PropTypes.object.isRequired,
      /**
       * @type {Language.Manager}
       */
      lang: PropTypes.object.isRequired
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
        this.props.themesManager.changeTheme(event.value);
        break;
      case 'language':
        this.props.lang.change(event.value);
        break;
      default:
        break;
    }
  }
}


export default Settings;
