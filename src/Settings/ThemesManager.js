import React from 'react';
import PropTypes from 'prop-types';
import Style from '../Shared/Style';

class ThemesManager extends React.Component {
  /**
   * Define properties.
   *
   * @returns {Object}
   */
  static get propTypes() {
    return {
      themes: PropTypes.object.isRequired,
      theme: PropTypes.string.isRequired
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

  /**
   * Create output for load css file.
   *
   * @returns {XML}
   */
  render() {
    let file = this.props.themes[this.props.theme];

    return <Style src={"/Style/Themes/" + file} />;
  }
}

export default ThemesManager;
