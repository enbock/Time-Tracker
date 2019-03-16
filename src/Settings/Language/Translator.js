class Translator {

  /**
   * @param {Object} adapter Interaction adapter.
   * @param {Ajax} api
   * @param {YamlConverter} converter
   *
   * @see Manager.defaultAdapter
   */
  constructor(adapter, api, converter) {
    this.adapter = adapter;
    this.api = api;
    this.converter = converter;
    this.language = '';
    this.translations = {};
  }

  /**
   * @param language
   */
  onChange(language) {
    if (language === this.language) {
      return;
    }
    this.language = language;

    /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
    this.api.loadLanguage('/Lang/' + this.language + '/' + this.adapter.getDomain() + '.yaml')
      .then(text => this.converter.convert(text))
      .then(data => this.onLanguageFile(data))
      .catch(error => console.error(error));
  }

  /**
   * @param {Object} data
   */
  onLanguageFile(data) {
    this.translations = this.flatten(data);
    this.adapter.onChange(this.language);
  }

  /**
   * @param {Object} data
   * @param {string} parentDomain
   *
   * @returns {Object}
   */
  flatten(data, parentDomain = '') {
    const parent = parentDomain !== '' ? parentDomain + '.' : '';
    let flat = {};

    for (let key in data) {
      let value = data[key];
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
