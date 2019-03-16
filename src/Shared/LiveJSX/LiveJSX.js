import PropTypes from 'prop-types';
import React from 'react';

export default class LiveJSX extends React.Component {
  /**
   * @param {Object} props
   * @param {Object} context
   * @param {Object} updater
   */
  constructor(props, context, updater) {
    super(props, context, updater);

    this.state = {
      jsx: function () {
        return <div className="mdl-progress mdl-js-progress mdl-progress__indeterminate" />;
      }
    };

    // remember loaded template
    this.loadedTemplate = '';
    this.firstShow = false;
  }

  /**
   * @returns {Object}
   */
  static get propTypes() {
    return {
      /**
       * @type {Ajax}
       */
      templateLoader: PropTypes.object.isRequired,
      template: PropTypes.string
    };
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
    if (this.loadedTemplate === template) {
      // already loaded
      return;
    }

    this.loadedTemplate = template;

    this.props.templateLoader
      .loadTemplate(template)
      .then(jsx => this.onTemplate(jsx))
      .catch(error => this.handleLoadingError(error))
    ;
  }

  /**
   * @param {Object} error
   */
  handleLoadingError(error) {
    /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
    console.error(error);
  }

  /**
   * @param {Object} jsx
   */
  onTemplate(jsx) {
    this.firstShow = true;
    this.setState({jsx: jsx});
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
    return this.state.jsx.apply(this);
  }
}
