export default class Setup {
  /**
   * @param {ValueChangeHandler} languageChangeHandler
   */
  constructor(languageChangeHandler) {
    this.languageChangeHandler = languageChangeHandler;
  }

  /**
   * @param {Response} response
   * @returns {Promise<void>}
   */
  async interact(response) {
    response.language = this.languageChangeHandler.value;
  }
}
