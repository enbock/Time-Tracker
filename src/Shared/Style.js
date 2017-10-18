import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

/**
 * An CSS file loader and importer.
 */
class Style extends React.Component {

  /**
   * Define properties.
   *
   * @returns {Object}
   */
  static get propTypes() {
    return {
      src:     PropTypes.string.isRequired,
      enabled: PropTypes.bool
    };
  }

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
      publicUrl: process.env.PUBLIC_URL || ''
    };
  }

  render() {
    return <link rel="stylesheet" href={this.props.enabled === false ? '' : this.state.publicUrl + this.props.src}/>;
  }
}

export default Style;
