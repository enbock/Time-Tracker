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
    if (request.newTheme === this.manager.activeTheme) {
      this.updateResponse(response);
      return;
    }

    this.manager.changeTheme(request.newTheme);

    this.updateResponse(response);
    response.isChanged = true;
  }

  /**
   * @param {Response} response
   */
  updateResponse(response) {
    response.theme = this.manager.activeTheme;
    response.file = this.manager.themeFile;
  }
}
