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
    this.adapter  = adapter;
    this.language = '';
  }

  /**
   * Change the language of the translator.
   * @param language
   */
  onChange(language) {
  }
}

export default Translator;
