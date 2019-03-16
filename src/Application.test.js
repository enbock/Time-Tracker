/* global jest, Babel */

import {shallow} from 'enzyme';
import React from 'react';
import Application from './Application';

jest.mock('./Shared/Router', () => 'Router');

describe('Application', function testApplication() {
  let bound = null;
  let mainMenuRegisterManager;
  let routeComponents;
  let templateLoader;

  beforeEach(function setup() {
    templateLoader = {
      loadTemplate: jest.fn().mockImplementation(template => {
        return Promise.resolve(() => <div>JSX</div>);
      })
    };
    routeComponents = {
      settings: 'SettingsComponent'
    };
    mainMenuRegisterManager = {
      toggle: jest.fn(),
      registerMenuChangeHandler: jest.fn(),
      deregisterMenuChangeHandler: jest.fn()
    };
  });

  it('Test menu interaction', function testLMenuInteraction(done) {
    const wrapper = shallow(<Application
      template="template"
      templateLoader={templateLoader}
      routeComponents={routeComponents}
      mainMenuRegisterManager={mainMenuRegisterManager}
    />);
    const instance = wrapper.instance();
    setTimeout(
      () => {
        expect(mainMenuRegisterManager.registerMenuChangeHandler).toHaveBeenCalledTimes(1);

        instance.onMainButtonClick();
        expect(mainMenuRegisterManager.toggle).toHaveBeenCalledTimes(1);

        instance.onMenuChange('newMenu');
        wrapper.unmount();
        expect(mainMenuRegisterManager.deregisterMenuChangeHandler).toHaveBeenCalled();
        done();
      },
      1
    );
  });

  it('Redirect from router to page', function testRouterRedirect() {
    const wrapper = shallow(<Application
      template="template"
      templateLoader={templateLoader}
      routeComponents={routeComponents}
      mainMenuRegisterManager={mainMenuRegisterManager}
    />);
    const instance = wrapper.instance();
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
