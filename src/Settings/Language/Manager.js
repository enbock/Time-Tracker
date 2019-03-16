import emptyFunction from 'fbjs/lib/emptyFunction';
import Translator from './Translator';

class Manager {
  /**
   * @param {string} defaultLanguage
   * @param {Factory} translatorFactory
   */
  constructor(defaultLanguage, translatorFactory) {
    this.domainList = {};
    this.language = defaultLanguage;
    this.translatorFactory = translatorFactory;
  }

  /**
   * @returns {Object}
   */
  static get defaultAdapter() {
    return {
      getDomain: emptyFunction,
      onChange: emptyFunction
    };
  }

  /**
   * @param {Object} adapter Interaction adapter.
   *
   * @returns {Translator}
   */
  setup(adapter) {
    const domain = adapter.getDomain();

    this.domainList[domain] = this.translatorFactory.createTranslator(adapter);
    this.domainList[domain].onChange(this.language);

    return this.domainList[domain];
  }

  /**
   * @param language
   */
  change(language) {
    this.language = language;
    for (let domain in this.domainList) {
      this.domainList[domain].onChange(language);
    }
  }
}

export default Manager;
