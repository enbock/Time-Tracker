export default class Ajax {
  /**
   * @param {string} publicUrl
   * @param {Babel} templateGenerator
   */
  constructor(publicUrl, templateGenerator) {
    this.publicUrl = publicUrl;
    this.templateGenerator = templateGenerator;
  }

  async loadTemplate(template) {
    const url = this.publicUrl + template;

    return fetch(url)
      .then(response => response.text())
      .then(text => this.templateGenerator.generate(text));
  }
}
