import PropTypes from 'prop-types';
import React from 'react';

/**
 * An CSS file loader and importer.
 */
class Style extends React.Component {

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

  /**
   * Define properties.
   *
   * @returns {Object}
   */
  static get propTypes() {
    return {
      src: PropTypes.string.isRequired,
      enabled: PropTypes.bool
    };
  }

  render() {
    return <link rel="stylesheet" href={this.props.enabled === false ? '' : this.state.publicUrl + this.props.src} />;
  }
}

export default Style;
