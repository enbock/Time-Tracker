import Axios from 'axios';
import YAML from 'yamljs';

/**
 * Language translator.
 */
class Translator {

  /**
   * Injection constructor.
   *
   * @param {Object} adapter Interaction adapter.
   *
   * @see Manager.defaultAdapter
   */
  constructor(adapter) {
    this.adapter      = adapter;
    this.language     = '';
    this.publicUrl    = process.env.PUBLIC_URL || '';
    this.translations = {};
  }

  /**
   * Change the language of the translator.
   * @param language
   */
  onChange(language) {
    if (language === this.language) {
      return;
    }
    this.language = language;

    const url = this.publicUrl + '/Lang/' + this.language + '/' + this.adapter.getDomain() + '.yaml';

    /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
    Axios.get(url)
      .then(response => this.onLanguageFile(response))
      .catch(error => console.error(error));
  }

  /**
   * Ajax handler for success loaded language file.
   *
   * @param response
   */
  onLanguageFile(response) {
    const data        = YAML.parse(response.data);
    this.translations = this.flatten(data);
    this.adapter.onChange(this.language);
  }

  /**
   * Flatten the hierarchical data to dot written flag list.
   *
   * @param {Object} data
   * @param {string} parentDomain
   *
   * @returns {Object}
   */
  flatten(data, parentDomain = '') {
    const parent = parentDomain !== '' ? parentDomain + '.' : '';
    let flat     = {};

    for (let key in data) {
      let value  = data[key];
      let domain = parent + key;
      if (value instanceof Object) {
        flat = Object.assign(flat, this.flatten(value, domain));
      } else {
        flat[domain] = String(value);
      }
    }

    return flat;
  }

  /**
   * Translate a value.
   *
   * @param {string} key
   *
   * @returns {string}
   */
  translate(key) {
    if (this.translations.hasOwnProperty(key)) {
      return this.translations[key];
    }

    return '';
  }
}

export default Translator;
