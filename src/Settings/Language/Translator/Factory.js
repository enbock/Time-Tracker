import Translator from '../Translator';

export default class Factory {
  /**
   * @param {Ajax} api
   * @param {YamlConverter} converter
   */
  constructor(api, converter) {
    this.api = api;
    this.converter = converter;
  }

  /**
   * @see Manager.defaultAdapter
   * @param {Object} adapter Interaction adapter.
   *
   * @returns {Translator}
   */
  createTranslator(adapter) {
    return new Translator(adapter, this.api, this.converter);
  }
}
