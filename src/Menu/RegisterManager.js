export default class RegisterManager {
  constructor() {
    this.changeHandler = [];
    this.toggleHandler = [];
  }

  /**
   * @param {[[Function]]} handler
   */
  registerMenuToggleHandler(handler) {
    const index = this.toggleHandler.indexOf(handler);
    if (index !== -1) {
      return;
    }
    this.toggleHandler.push(handler);
  }

  /**
   * @param {[[Function]]} handler
   */
  deregisterMenuToggleHandler(handler) {
    const index = this.toggleHandler.indexOf(handler);
    if (index === -1) {
      return;
    }
    this.toggleHandler.splice(index, 1);
  }

  /**
   * @param {[[Function]]} handler
   */
  registerMenuChangeHandler(handler) {
    const index = this.changeHandler.indexOf(handler);
    if (index !== -1) {
      return;
    }
    this.changeHandler.push(handler);
  }

  /**
   * @param {[[Function]]} handler
   */
  deregisterMenuChangeHandler(handler) {
    const index = this.changeHandler.indexOf(handler);
    if (index === -1) {
      return;
    }
    this.changeHandler.splice(index, 1);
  }

  change(menuId) {
    this.changeHandler.forEach(handler => handler(menuId));
  }

  toggle() {
    this.toggleHandler.forEach(handler => handler());
  }
}
