import PropTypes from 'prop-types';
import React from 'react';
import Component from '../Shared/LiveJSX';
import Router from '../Shared/Router';

class Application extends Component {
  /**
   * @param {Object} props
   * @param {Object} context
   * @param {Object} updater
   */
  constructor(props, context, updater) {
    super(props, context, updater);

    this.state = Object.assign(
      this.state,
      {
        currentComponent: <div />,
        history: {
          page: 'none',
          root: process.env.PUBLIC_URL
        },
        pathname: ''
      }
    );

    this.boundPathChange = this.onPathChange.bind(this);
    this.boundChangeMenu = this.onMenuChange.bind(this);
  }

  /**
   * @returns {string}
   */
  static get template() {
    return '/Template/Application.html.tpl';
  }

  /**
   * @returns {Object}
   */
  static get routes() {
    return {
      index: '/',
      settings: '/settings/' // option page
    };
  }

  /**
   * @returns {Object}
   */
  static get propTypes() {
    return {
      /**
       * @type {Object}
       */
      routeComponents: PropTypes.object.isRequired,
      /**
       * @type {Menu.RegisterManager}
       */
      mainMenuRegisterManager: PropTypes.object.isRequired
    };
  }

  onMainButtonClick() {
    this.props.mainMenuRegisterManager.toggle();
  }

  /**
   * @param {string} menu
   */
  onMenuChange(menu) {
    // TODO: router stuff here?
    const history = this.state.history;
    history.page = menu;
    this.setState({history: history});
  }

  /**
   * @param event
   */
  onPathChange(event) {
    this.setState(
      {
        pathname: event.pathname,
        history: event.state
      }
    );
  }

  /**
   * @param pathname
   */
  restorePageByPathName(pathname) {
    const pages = Application.routes;

    // fallback
    let history = {
      page: 'index',
      root: process.env.PUBLIC_URL
    };

    // create history by pathname detection.
    for (let page in pages) {
      let index = pathname.indexOf(pages[page]);
      /**
       * Check if in path and goes to end.
       * TODO: When data attached to path, is it needed to change this logic.
       */
      if (index !== -1 && pages[page].length + index === pathname.length) {
        history = {
          page: page
        };

        break;
      }
    }

    // actualize root pathname
    history.root = process.env.PUBLIC_URL;

    return history;
  }

  componentWillUnmount() {
    this.props.mainMenuRegisterManager.deregisterMenuChangeHandler(this.boundChangeMenu);
  }

  /**
   * @param {Object} nextProps
   * @param {Object} nextState
   */
  componentWillUpdate(nextProps, nextState) {
    if (nextState.history === null) {
      nextState.history = this.restorePageByPathName(nextState.pathname);
    }
    // Go to route
    nextState.pathname = nextState.history.root + Application.routes[nextState.history.page];

    const nextPage = nextState.history.page;

    if (this.props.routeComponents.hasOwnProperty(nextPage)) {
      nextState.currentComponent = this.props.routeComponents[nextPage];
    } else {
      nextState.currentComponent = <div>Index</div>;
    }
  }

  componentWillMount() {
    super.componentWillMount();
    this.props.mainMenuRegisterManager.registerMenuChangeHandler(this.boundChangeMenu);
  }

  /**
   * @returns {XML}
   */
  render() {
    return (
      <div>
        <Router
          onChange={this.boundPathChange}
          state={this.state.history}
          pathname={this.state.pathname}
        />
        {super.render()}
      </div>
    );
  }


}

export default Application;
