import PropTypes from 'prop-types';
import React from 'react';

/**
 * The History API connection.
 * That router is more an adapter between React and the HTML5 History API.
 * What to do, if a route is change isn't responsibility of this router.
 */
class Router extends React.Component {
  /**
   * Constructor.
   *
   * @param {Object} props
   * @param {Object} context
   * @param {Object} updater
   */
  constructor(props, context, updater) {
    super(props, context, updater);

    this.history = null;
    this.pathname = '';

    this.boundPopState = this.onPopState.bind(this);
  }

  /**
   * Define properties.
   *
   * @returns {Object}
   */
  static get propTypes() {
    return {
      onChange: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired,
      pathname: PropTypes.string.isRequired
    };
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
   * Remove connection to browser API.
   */
  componentWillUnmount() {
    global.removeEventListener('popstate', this.boundPopState);
    this.history = null;
  }

  /**
   * Push or replace new state if needed.
   * The history url will be replaced, when the state are equal.
   *
   * @param nextProps
   */
  componentWillUpdate(nextProps) {
    const pathname = nextProps.pathname;
    let command = 'pushState';
    let allEquals = true;

    if (this.history.state && nextProps.state) {
      for (let key in nextProps.state) {
        if (
          !this.history.state.hasOwnProperty(key)
          || this.history.state[key] !== nextProps.state[key]
        ) {
          allEquals = false;
        }
        if (allEquals === true) {
          command = 'replaceState';
        }
      }
    }
    if (allEquals && pathname === this.pathname) {
      // do nothing when nothing changed.
      return;
    }

    this.history[command](nextProps.state, '', pathname);
    this.popStateChanged(pathname, nextProps.state);
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
  popStateChanged(pathname, state) {
    this.pathname = pathname;
    this.props.onChange({pathname: pathname, state: !state || Object.keys(state).length === 0 ? null : state});
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
