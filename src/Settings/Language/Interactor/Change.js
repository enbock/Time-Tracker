export default class Change {
  /**
   * @param {Manager} manager
   */
  constructor(manager) {
    this.manager = manager;
  }

  /**
   * @param {Request} request
   * @param {Response} response
   */
  async interact(request, response) {
    if (request.newLanguage === this.manager.language) {
      return;
    }

    this.manager.change(request.newLanguage);
    response.isChanged = true;
  }
}
