import emptyFunction from 'fbjs/lib/emptyFunction';

class Manager {
  /**
   * @param {Factory} translatorFactory
   * @param {ValueChangeHandler} languageChangeHandler
   */
  constructor(translatorFactory, languageChangeHandler) {
    this.domainList = {};
    this.translatorFactory = translatorFactory;
    this.languageChangeHandler = languageChangeHandler;
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

    return this.domainList[domain];
  }

  /**
   * @param language
   */
  change(language) {
    this.languageChangeHandler.setValue(language);
  }
}

export default Manager;
