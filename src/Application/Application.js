import React from 'react';
import Component from '../Shared/LiveJSX';
import Menu from '../Menu';
import Router from './Router';

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
          page: 'none'
        }
      }
    );

    this.menuAdapter = {
      registerMenuToggleHandler:   this.registerMenuToggleHandler.bind(this),
      deregisterMenuToggleHandler: this.deregisterMenuToggleHandler.bind(this)
    };

    this.registeredButtonHandler = [];
  }

  onMainButtonClick() {
    this.registeredButtonHandler.forEach(handler => handler());
  }

  /**
   * Set state to menu is closed.
   */
  onMenuChange(menu) {
    // TODO: router stuff here?
    this.setState({history: {page: menu}});
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
   * Adding singleton components to application.
   *
   * @returns {XML}
   */
  render() {
    return (
      <div>
        <Router/>
        {super.render()}
      </div>
    );
  }
}

export default Application;
