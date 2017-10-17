import React from 'react';
import PropTypes from 'prop-types';

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
  }

  render() {
    return <link rel="stylesheet" href={this.props.enabled === false ? '' : this.props.src}/>;
  }
}

export default Style;
