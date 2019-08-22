import PropTypes from 'prop-types';
import React from 'react';

class Router extends React.Component {
  /**
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
   * @returns {Object}
   */
  static get propTypes() {
    return {
      onChange: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired,
      pathname: PropTypes.string.isRequired
    };
  }

  componentDidMount() {
    this.history = global.history;
    global.addEventListener('popstate', this.boundPopState);
    this.popStateChanged(global.location.pathname, this.history.state);
  }

  componentWillUnmount() {
    global.removeEventListener('popstate', this.boundPopState);
    this.history = null;
  }

  /**
   * @param nextProps
   */
  componentWillUpdate(nextProps) {
    const pathname = nextProps.pathname;
    let command = 'pushState';
    let allEquals = true;

    if (this.history.state && nextProps.state) {
      command = this.decideCommand(nextProps.state);
      allEquals = command === 'replaceState';
    }
    if (allEquals && pathname === this.pathname) {
      // do nothing when nothing changed.
      return;
    }

    this.history[command](nextProps.state, '', pathname);
    this.popStateChanged(pathname, nextProps.state);
  }

  decideCommand(state) {
    let command = 'pushState';
    let allEquals = true;
    let key;
    for (key in state) {
      if (
        !this.history.state.hasOwnProperty(key)
        || this.history.state[key] !== state[key]
      ) {
        allEquals = false;
      }
      if (allEquals === true) {
        command = 'replaceState';
      }
    }
    return command;
  }

  /**
   * @param {PopStateEvent} event
   */
  onPopState(event) {
    this.popStateChanged(global.location.pathname, event.state);
  }

  /**
   * @param {string} pathname
   * @param {Object} state
   */
  popStateChanged(pathname, state) {
    this.pathname = pathname;
    this.props.onChange({pathname: pathname, state: !state || Object.keys(state).length === 0 ? null : state});
  }

  /**
   * @returns {null}
   */
  render() {
    return null;
  }
}

export default Router;
