import PropTypes from 'prop-types';
import React from 'react';
import CSSStyle from '../../Shared/Style';

export default class Style extends React.Component {
  /**
   * Constructor.
   *
   * @param {Object} props
   * @param {Object} context
   * @param {Object} updater
   */
  constructor(props, context, updater) {
    super(props, context, updater);
    this.state = {themesFile: false};

    this.themesManagerAdapter = {
      onThemeChange: this.onThemeChange.bind(this)
    };
  }

  /**
   * @returns {Object}
   */
  static get propTypes() {
    return {
      /**
       * @type {Manager}
       */
      themesManager: PropTypes.object.isRequired
    };
  }

  componentDidMount() {
    this.props.themesManager.setAdapter(this.themesManagerAdapter);
  }

  /**
   * @param {string}  _
   * @param {string} newFile
   */
  onThemeChange(_, newFile) {
    this.setState({themesFile: newFile});
  }

  render() {
    if (!this.state.themesFile) {
      return null;
    }

    return <CSSStyle src={'/Style/Themes/' + this.state.themesFile} />;
  }
}
