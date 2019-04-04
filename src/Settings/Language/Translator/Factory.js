import Translator from '../Translator';

export default class Factory {
  /**
   * @param {Ajax} api
   * @param {YamlConverter} converter
   * @param {ValueChangeHandler} languageChangeHandler
   */
  constructor(api, converter, languageChangeHandler) {
    this.api = api;
    this.converter = converter;
    this.languageChangeHandler = languageChangeHandler;
  }

  /**
   * @see Manager.defaultAdapter
   * @param {Object} adapter Interaction adapter.
   *
   * @returns {Translator}
   */
  createTranslator(adapter) {
    return new Translator(adapter, this.api, this.converter, this.languageChangeHandler);
  }
}
