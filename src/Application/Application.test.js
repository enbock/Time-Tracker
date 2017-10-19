/* global jest, Babel */

import {mockAxiosAction} from 'axios';
import React from 'react';
import {shallow} from 'enzyme';
import Application from './Application';

jest.mock('../Menu', () => 'Menu');
jest.mock('../Settings', () => 'Settings');
jest.mock('../Shared/Router', () => 'Router');

/**
 * Test Application Container.
 */
describe('Application', function testApplication() {
  let bound     = null;
  let success = false;
  let promise;

  /**
   * Reset global mocks.
   */
  beforeEach(function beforeEach() {
    Babel.transform.mockClear();

    promise = {
      then:  function onThen(callback) {
        bound = callback;
        return promise;
      },
      catch: function onCatch() {
        return promise;
      }
    };

    mockAxiosAction(
      'get',
      function onRequest(url) {
        expect(url).toBe('/Template/Application.html.tpl');
        success = true;

        return promise;
      }
    );
    Babel.transform.mockReturnValue(
      {
        code: 'React.createElement(\'button\', { onClick: this.onMainButtonClick.bind(this) })'
      }
    );
  });

  /**
   * Test if correct layout loaded.
   */
  it('Loads the correct layout', function testLoadLayout() {
    const wrapper     = shallow(<Application/>);
    const instance    = wrapper.instance();
    bound({data: 'TEMPLATE'});
    wrapper.update();

    expect(instance.components).toBeDefined();

    // Template loaded?
    expect(success).toBe(true);
  });

  /**
   * Test if menu interaction works.
   */
  it('Test menu interaction', function testLoadLayout() {
    const wrapper     = shallow(<Application/>);
    const instance    = wrapper.instance();
    const buttonClick = jest.fn();

    instance.menuAdapter.registerMenuToggleHandler(buttonClick);
    bound({data: 'TEMPLATE'});
    wrapper.update();

    wrapper.find('button').simulate('click');
    expect(buttonClick).toHaveBeenCalled();

    instance.onMenuChange('newMenu');
    instance.menuAdapter.deregisterMenuToggleHandler(buttonClick);
    instance.menuAdapter.deregisterMenuToggleHandler(buttonClick); // check that double remove don't break
  });

  /**
   * Test kinds of redirection.
   */
  it('Redirect from router to page', function testRouterRedirect() {
    const wrapper     = shallow(<Application/>);
    const instance    = wrapper.instance();
    bound({data: 'TEMPLATE'});
    wrapper.update();


    global.process.env.PUBLIC_URL = "/MainPath";

    // start on sub page in a sub directory of hosting page
    instance.onPathChange(
      {
        pathname: '/MainPath/settings/',
        state: null
      }
    );
    expect(instance.state.pathname).toBe('/MainPath/settings/');
    expect(instance.state.history.page).toBe('settings');
    expect(instance.state.history.root).toBe('/MainPath');

    // start on index page in a sub directory of hosting page
    instance.onPathChange(
      {
        pathname: '/MainPath/',
        state: null
      }
    );
    expect(instance.state.pathname).toBe('/MainPath/');
    expect(instance.state.history.page).toBe('index');
    expect(instance.state.history.root).toBe('/MainPath');

    // reload page with using state data
    instance.onPathChange(
      {
        pathname: '/settings/', // <-- should be ignored if state present
        state: {page:"index", root:"/MainPath"}
      }
    );
    expect(instance.state.pathname).toBe('/MainPath/');
    expect(instance.state.history.page).toBe('index');
    expect(instance.state.history.root).toBe('/MainPath');

    global.process.env.PUBLIC_URL = "";

    // start on sub page in a root directory of hosting page
    instance.onPathChange(
      {
        pathname: '/',
        state: null
      }
    );
    expect(instance.state.pathname).toBe('/');
    expect(instance.state.history.page).toBe('index');
    expect(instance.state.history.root).toBe('');
  });

  /**
   * Test kinds of redirection.
   */
  it('Change the theme', function testRouterRedirect() {
    const wrapper  = shallow(<Application/>);
    const instance = wrapper.instance();
    bound({data: 'TEMPLATE'});
    wrapper.update();

    instance.onThemesChange('new');
    expect(instance.state.theme).toBe('new');
  });
});
