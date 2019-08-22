import emptyFunction from 'fbjs/lib/emptyFunction';
import PropTypes from 'prop-types';

export default Base => class ReactRedrawMixIn extends Base {
  /**
   * @param {Object} props
   * @param {Object} context
   * @param {Object} updater
   */
  constructor(props, context, updater) {
    super(props, context, updater);
    props.redrawAdapter.onChange = this.onChange.bind(this);
    Object.assign(this.state, {redraw: null});
  }

  /**
   * @returns {Object}
   */
  static get propTypes() {
    return Object.assign(
      // eslint-disable-next-line
      super.propTypes,
      {
        redrawAdapter: PropTypes.object.isRequired
      }
    );
  }

  /**
   * @returns {Object}}
   */
  static get defaultAdapter() {
    return {onChange: emptyFunction};
  };

  onChange() {
    this.setState({redraw: new Date().valueOf()});
  }
};
