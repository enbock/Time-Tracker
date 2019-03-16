export default class Ajax {
  /**
   * @param {string} publicUrl
   */
  constructor(publicUrl) {
    this.publicUrl = publicUrl;
  }

  async loadLanguage(languageFilePath) {
    const url = this.publicUrl + languageFilePath;

    return fetch(url).then(response => response.text());
  }
}
