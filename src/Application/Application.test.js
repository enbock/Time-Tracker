/* global jest, Babel */

import {mockAxiosAction} from 'axios';
import {shallow} from 'enzyme';
import React from 'react';
import Application from './Application';

jest.mock('../Menu', () => 'Menu');
jest.mock(
  '../Settings',
  function createSettingModuleMock() {
    let mock = jest.fn();
    mock.ThemesManager = 'Manager';
    mock.Language = {Manager: 'Manager'};

    return mock;
  }
);
jest.mock('../Shared/Router', () => 'Router');

describe('Application', function testApplication() {
  let bound = null;
  let success = false;
  let promise;
  let mainMenuRegisterManager;
  let routeComponents;

  beforeEach(function beforeEach() {
    Babel.transform.mockClear();

    promise = {
      then: function onThen(callback) {
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

    routeComponents = {
      settings: 'SettingsComponent'
    };
    mainMenuRegisterManager = {
      toggle: jest.fn(),
      registerMenuChangeHandler: jest.fn(),
      deregisterMenuChangeHandler: jest.fn()
    };
  });

  it('Loads the correct layout', function testLoadLayout() {
    const wrapper = shallow(<Application
      routeComponents={routeComponents}
      mainMenuRegisterManager={mainMenuRegisterManager}
    />);
    bound({data: 'TEMPLATE'});
    wrapper.update();

    // Template loaded?
    expect(success).toBe(true);
  });

  it('Test menu interaction', function testLMenuInteraction() {
    const wrapper = shallow(<Application
      routeComponents={routeComponents}
      mainMenuRegisterManager={mainMenuRegisterManager}
    />);
    const instance = wrapper.instance();

    bound({data: 'TEMPLATE'});
    wrapper.update();

    expect(mainMenuRegisterManager.registerMenuChangeHandler).toHaveBeenCalledTimes(1);

    wrapper.find('button').simulate('click');
    expect(mainMenuRegisterManager.toggle).toHaveBeenCalledTimes(1);

    instance.onMenuChange('newMenu');

    wrapper.unmount();
    expect(mainMenuRegisterManager.deregisterMenuChangeHandler).toHaveBeenCalled();
  });

  it('Redirect from router to page', function testRouterRedirect() {
    const wrapper = shallow(<Application
      routeComponents={routeComponents}
      mainMenuRegisterManager={mainMenuRegisterManager}
    />);
    const instance = wrapper.instance();
    bound({data: 'TEMPLATE'});
    wrapper.update();

    global.process.env.PUBLIC_URL = '/MainPath';

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
        state: {page: 'index', root: '/MainPath'}
      }
    );
    expect(instance.state.pathname).toBe('/MainPath/');
    expect(instance.state.history.page).toBe('index');
    expect(instance.state.history.root).toBe('/MainPath');

    global.process.env.PUBLIC_URL = '';

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
});
