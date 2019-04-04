export default class Setup {
  /**
   * @param {Manager} manager
   */
  constructor(manager) {
    this.manager = manager;
  }

  /**
   * @param {Response} response
   * @returns {Promise<void>}
   */
  async interact(response) {
    response.theme = this.manager.activeTheme;
  }
}
