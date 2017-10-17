import React from 'react';
import Component from '../Shared/LiveJSX';
import Menu from '../Menu';
import Router from '../Shared/Router';
import Settings from '../Settings';
import Style from '../Shared/Style';

/**
 * Root Application.
 */
class Application extends Component {
  /**
   * Define template of component.
   *
   * @returns {string}
   */
  static get template() {
    return '/Template/Application.html.tpl';
  }

  /**
   * Setup routes of the application.
   *
   * @returns {Object}
   */
  static get routes() {
    return {
      index: '/',
      settings: '/settings/' // option page
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

    this.components = {
      MainMenu: Menu.Main
    };

    this.state = Object.assign(
      this.state,
      {
        currentComponent: <div/>,
        history:          {
          page: 'none',
          root: process.env.PUBLIC_URL
        },
        pathname:         ''
      }
    );

    this.menuAdapter = {
      registerMenuToggleHandler:   this.registerMenuToggleHandler.bind(this),
      deregisterMenuToggleHandler: this.deregisterMenuToggleHandler.bind(this)
    };

    this.registeredButtonHandler = [];

    this.boundPathChange = this.onPathChange.bind(this);
  }

  onMainButtonClick() {
    this.registeredButtonHandler.forEach(handler => handler());
  }

  /**
   * Set state to menu is closed.
   */
  onMenuChange(menu) {
    // TODO: router stuff here?
    const history = this.state.history;
    history.page = menu;
    this.setState({history: history});
  }

  /**
   * Received router change.
   *
   * @param event
   */
  onPathChange(event) {
    this.setState(
      {
        pathname: event.pathname,
        history:  event.state
      }
    );
  }

  /**
   * Register handle for the main button click.
   *
   * @param {[[Function]]} handler
   */
  registerMenuToggleHandler(handler) {
    this.registeredButtonHandler.push(handler);
  }

  /**
   * Remove handler for main button click.
   *
   * @param {[[Function]]} handler
   */
  deregisterMenuToggleHandler(handler) {
    const index = this.registeredButtonHandler.indexOf(handler);
    if (index === -1) {
      return;
    }
    this.registeredButtonHandler.splice(index, 1);
  }

  /**
   * Decide the page
   * @param pathname
   */
  restorePageByPathName(pathname) {
    const pages  = Application.routes;

    // fallback
    let history = {
      page: 'index',
      root: process.env.PUBLIC_URL
    };

    let found = false;
    // create history by pathname detection.
    for(let page in pages) {
      let index = pathname.indexOf(pages[page]);
      /**
       * Check if in path and goes to end.
       * TODO: When data attached to path, is it needed to change this logic.
       */
      if(index !== -1 && pages[page].length + index === pathname.length) {
        history = {
          page: page
        };

        break;
      }
    }

    // actualize root pathname
    history.root = process.env.PUBLIC_URL ; //pathname.substr(0, pathname.lastIndexOf(pages[history.page]));

    return history;
  }

  /**
   * Decider routing
   *
   * @param {Object} nextProps
   * @param {Object} nextState
   */
  componentWillUpdate(nextProps, nextState) {
    if (nextState.history === null) {
      nextState.history = this.restorePageByPathName(nextState.pathname);
    }
    // Go to route
    nextState.pathname = nextState.history.root + Application.routes[nextState.history.page];

    // Select component
    switch(nextState.history.page)
    {
      case 'settings':
        nextState.currentComponent = (
            <Settings/>
        );
        break;
      default:
        nextState.currentComponent = <div>Index</div>;
        break;
    }
  }

  /**
   * Adding singleton components to application.
   *
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
        <Style src="/Style/google.css" />
        <Style src="/Style/material-components-web.min.css" />
        {super.render()}
      </div>
    );
  }
}

export default Application;
