import React from 'react';
import PropTypes from 'prop-types';

/**
 * The History API connection.
 * That router is more an adapter between React and the HTML5 History API.
 * What to do, if a route is change isn't responsibility of this router.
 */
class Router extends React.Component
{
  /**
   * Define properties.
   *
   * @returns {Object}
   */
  static get propTypes() {
    return {
      onChange: PropTypes.func.isRequired,
      state:    PropTypes.object.isRequired,
      pathname: PropTypes.string.isRequired
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

    this.history  = null;
    this.pathname = "";

    this.boundPopState = this.onPopState.bind(this);
  }

  /**
   * Connect to browser API.
   */
  componentDidMount() {
    this.history = global.history;
    global.addEventListener('popstate', this.boundPopState);
    this.popStateChanged(global.location.pathname, this.history.state);
  }

  /**
   * Push new state if needed.
   *
   * @param nextProps
   */
  componentWillUpdate(nextProps) {
    const pathname = nextProps.pathname;
    if (pathname !== this.pathname) {
      this.history.pushState(nextProps.state, '', pathname);
      this.popStateChanged(pathname, nextProps.state);
    }
  }

  /**
   * Remove connection to browser API.
   */
  componentWillUnmount() {
    global.removeEventListener('popstate', this.boundPopState);
    this.history = null;
  }

  /**
   * Browser API handler to proxy change events.
   * @param {PopStateEvent} event
   */
  onPopState(event) {
    this.popStateChanged(global.location.pathname, event.state);
  }

  /**
   * Propagate new state and update cached data.
   *
   * @param {string} pathname
   * @param {Object} state
   */
  popStateChanged(pathname, state)
  {
    this.pathname = pathname;
    this.props.onChange({pathname: pathname, state: !state ? null : state});
  }

  /**
   * Component does not have visual output.
   * @returns {null}
   */
  render() {
    return null;
  }
}

export default Router;
