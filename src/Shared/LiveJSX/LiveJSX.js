import React from 'react';
import Axios from 'axios';

// Bridge to templates
global.React = React;

/**
 * JSX loader base class.
 */
class LiveJSX extends React.Component {
  /**
   * Constructor.
   *
   * @param {Object} props
   * @param {Object} context
   * @param {Object} updater
   */
  constructor(props, context, updater) {
    super(props, context, updater);

    this.state = {
      view:      function () {
        return <div className="mdl-progress mdl-js-progress mdl-progress__indeterminate"/>;
      },
      publicUrl: process.env.PUBLIC_URL || ''
    };

    // remember loaded template
    this.loadedTemplateUrl = '';
    this.firstShow         = false;
  }

  /**
   * Generate JSX live code.
   *
   * @param {string} data
   * @returns {*}
   */
  static generate(data) {
    let template = data.trim();
    template     = template.replace(/class=/g, 'className=');

    let code = global.Babel.transform(template, {presets: ['react']}).code;
    code     = code.replace(/React.createElement\(/, 'return React.createElement(');

    //console.log(template);
    //console.log(code);

    // https://github.com/babel/babel/tree/master/packages/babel-standalone#usage
    // eslint-disable-next-line
    return new Function(code);
  }

  /**
   * Start loading on mount.
   */
  componentWillMount() {
    this.loadTemplate(this.props, this.state);
  }

  /**
   * Start loading if template changed.
   * @param nextProps
   * @param nextState
   */
  componentWillUpdate(nextProps, nextState) {
    this.loadTemplate(nextProps, nextState);
  }

  /**
   * Load template.
   * @param {Object} props
   * @param {Object} state
   */
  loadTemplate(props, state) {
    let template = props.template || this.template || Object.getPrototypeOf(this).constructor.template;

    if(!template) return;

    const url = state.publicUrl + template;

    if (this.loadedTemplateUrl === url) {
      // already loaded
      return;
    }

    this.loadedTemplateUrl = url;

    Axios.get(url)
      .then(response => this.onTemplate(response))
      .catch(error => console.error(error));
  }

  /**
   * Template loaded.
   *
   * @param {Object} response
   */
  onTemplate(response) {
    const jsx      = LiveJSX.generate(response.data);
    this.firstShow = true;
    this.setState({view: jsx});
  }

  /**
   * Abstract function for JSX mount info.
   */
  onTemplateMounted() {
  }

  /**
   * Call template mounted on first view.
   *
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
   * Actualize view.
   *
   * @returns {*}
   */
  render() {
    return this.state.view.apply(this);
  }
}

export default LiveJSX;
