export default class YamlConverter {
  /**
   * @param {yamljs} yamlJs
   */
  constructor(yamlJs) {
    this.yamljs = yamlJs;
  }

  async convert(text) {
    return this.yamljs.parse(text);
  }
}
