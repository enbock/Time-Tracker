import PropTypes from 'prop-types';
import Component from '../Shared/LiveJSX';

/**
 * Option screen primary component.
 */
class Settings extends Component {

  /**
   * Define template of this component.
   * @returns {string}
   */
  static get template() {
    return '/Template/Settings.html.tpl';
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

    this.languageAdapter = {
      onChange:  this.onLanguageChange.bind(this),
      getDomain: () => 'Settings'
    };
  }

  /**
   * Define properties.
   * @returns {Object}
   */
  static get propTypes() {
    return {
      onThemesChange:   PropTypes.func.isRequired,
      onLanguageChange: PropTypes.func.isRequired,
      lang:             PropTypes.object.isRequired
    };
  }

  /**
   * Setup language manager on mount.
   */
  componentWillMount() {
    super.componentWillMount();
    this.lang = this.props.lang.setup(this.languageAdapter);
  }

  /**
   * Draw component after language loaded.
   *
   * @param {string} language
   */
  onLanguageChange(language) {
    this.setState({language: language});
  }

  /**
   * On Selection change.
   *
   * @param {Object} event
   *
   * @see ../Shared/Select.onChange
   */
  onSelectionChange(event) {
    switch (event.name) {
      case 'color':
        this.props.onThemesChange(event.value);
        break;
      case 'language':
        this.props.onLanguageChange(event.value);
        break;
      default:
        break;
    }
  }
}


export default Settings;
