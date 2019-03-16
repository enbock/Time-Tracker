export default class Babel {
  constructor(transformOptions) {
    this.transformOptions = transformOptions;
  }

  /**
   * @param {string} data
   * @returns {*}
   */
  generate(data) {
    let template = data.trim();
    template = template.replace(/class=/g, 'className=');

    let code = this.Babel.transform(template, this.transformOptions).code;
    code = code.replace(/React.createElement\(/, 'return React.createElement(');

    // https://github.com/babel/babel/tree/master/packages/babel-standalone#usage
    // eslint-disable-next-line
    return new Function(code);
  }
}
