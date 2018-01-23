import React from 'react';
import PropTypes from 'prop-types';

/**
 * Language manager.
 *
 * Handles set setup domains and switch setting centrally.
 */
class Manager extends React.Component {
  /**
   * Define properties.
   *
   * @returns {Object}
   */
  static get propTypes() {
    return {
      languages: PropTypes.array.isRequired
    };
  }

  render() {
    return null;
  }
}

export default Manager;
