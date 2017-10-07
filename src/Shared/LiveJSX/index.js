import React from "react";
import Axios from "axios";
import { ProgressBar } from 'react-mdl';

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
      view: function () {
        return <ProgressBar indeterminate />;
      },
      publicUrl: process.env.PUBLIC_URL || ""
    };

    // remember loaded template
    this.loadedTemplateUrl = "";
  }

  /**
   * Generate JSX live code.
   *
   * @param {string} data
   * @returns {*}
   */
  static generate(data) {
    // https://github.com/babel/babel/tree/master/packages/babel-standalone#usage
    // eslint-disable-next-line
    return new Function('return ' + global.Babel.transform(data.trim(), { presets: ['react'] }).code);
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
    const jsx = LiveJSX.generate(response.data);
    this.setState({view: jsx});
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
