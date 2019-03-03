import Axios from 'axios';
import React from 'react';

// Bridge to templates
global.React = React;

class LiveJSX extends React.Component {
  /**
   * @param {Object} props
   * @param {Object} context
   * @param {Object} updater
   */
  constructor(props, context, updater) {
    super(props, context, updater);

    this.state = {
      view: function () {
        return <div className="mdl-progress mdl-js-progress mdl-progress__indeterminate"/>;
      },
      publicUrl: process.env.PUBLIC_URL || ''
    };

    // remember loaded template
    this.loadedTemplateUrl = '';
    this.firstShow = false;
  }

  /**
   * @param {string} data
   * @returns {*}
   */
  static generate(data) {
    let template = data.trim();
    template = template.replace(/class=/g, 'className=');

    let code = global.Babel.transform(template, {presets: ['react']}).code;
    code = code.replace(/React.createElement\(/, 'return React.createElement(');

    //console.log(template);
    //console.log(code);

    // https://github.com/babel/babel/tree/master/packages/babel-standalone#usage
    // eslint-disable-next-line
    return new Function(code);
  }

  componentWillMount() {
    this.loadTemplate(this.props, this.state);
  }

  /**
   * @param nextProps
   * @param nextState
   */
  componentWillUpdate(nextProps, nextState) {
    this.loadTemplate(nextProps, nextState);
  }

  /**
   * @param {Object} props
   * @param {Object} state
   */
  loadTemplate(props, state) {
    let template = props.template || this.template || Object.getPrototypeOf(this).constructor.template;

    if (!template) return;

    const url = state.publicUrl + template;

    if (this.loadedTemplateUrl === url) {
      // already loaded
      return;
    }

    this.loadedTemplateUrl = url;

    /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
    Axios.get(url)
         .then(response => this.onTemplate(response))
         .catch(error => console.error(error));
  }

  /**
   * @param {Object} response
   */
  onTemplate(response) {
    const jsx = LiveJSX.generate(response.data);
    this.firstShow = true;
    this.setState({view: jsx});
  }

  onTemplateMounted() {
  }

  /**
   * @param prevProps
   * @param prevState
   * @param prevContext
   */
  componentDidUpdate(prevProps, prevState, prevContext) {
    if (this.firstShow) {
      this.firstShow = false;
      this.onTemplateMounted();
    }
  }

  /**
   * @returns {*}
   */
  render() {
    return this.state.view.apply(this);
  }
}

export default LiveJSX;
