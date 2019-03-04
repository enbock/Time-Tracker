import emptyFunction from 'fbjs/lib/emptyFunction';

class Manager {
  /**
   * @param {Object}themes
   */
  constructor(themes) {
    this.themes = themes;
    this.activeTheme = Object.keys(themes)[0];
    this.adapter = Manager.defaultAdapter;
  }

  /**
   * @returns {Object}
   */
  static get defaultAdapter() {
    return {
      onThemeChange: emptyFunction
    };
  }

  setAdapter(adapter) {
    this.adapter = adapter;
    adapter.onThemeChange(this.activeTheme, this.themeFile);
  }

  /**
   * @returns {string}
   */
  get themeFile() {
    return this.themes[this.activeTheme];
  }

  /**
   * @param {string} newTheme
   */
  changeTheme(newTheme) {
    if (this.themes.hasOwnProperty(newTheme) === false) {
      return;
    }
    this.activeTheme = newTheme;
  }
}

export default Manager;
