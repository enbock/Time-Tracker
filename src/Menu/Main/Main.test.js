/** global: jest */

import {mockAxiosAction} from 'axios';
import {shallow} from 'enzyme';
import React from 'react';
import Main from './Main';

jest.mock('react-dom');

describe('Main Menu', function testMain() {

  it('Loads layout and do interactions', function testLoadLayout() {
    let bound = null;
    const promise = {
      then: function onThen(callback) {
        bound = callback;
        return promise;
      },
      catch: function onCatch() {
        return promise;
      }
    };

    let success = false;

    mockAxiosAction(
      'get',
      function onRequest(url) {
        expect(url).toBe('/Template/Menu/Main.html.tpl');
        success = true;

        return promise;
      }
    );

    const mainMenuRegisterManager = {
      change: jest.fn(),
      registerMenuToggleHandler: jest.fn(),
      deregisterMenuToggleHandler: jest.fn()
    };

    const lang = {
      setup: function (adapter) {
        adapter.onChange('test');
        expect(adapter.getDomain()).toBe('Menu/Main');
      }
    };

    const wrapper = shallow(<Main lang={lang} mainMenuRegisterManager={mainMenuRegisterManager} />);
    let instance = wrapper.instance();
    instance.refs = {
      settingsMenu: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      }
    };
    bound({data: 'TEMPLATE'});
    wrapper.setProps({});

    expect(success).toBe(true);
    expect(instance.state.language).toBe('test');

    instance.onMenuClick('one');
    expect(mainMenuRegisterManager.registerMenuToggleHandler).toHaveBeenCalled();
    expect(mainMenuRegisterManager.change).toHaveBeenCalledWith('one');
    mainMenuRegisterManager.registerMenuToggleHandler.mock.calls[0][0]();
    expect(wrapper.instance().state.open).toBe(true);

    wrapper.unmount();
    expect(mainMenuRegisterManager.deregisterMenuToggleHandler).toHaveBeenCalled();
    expect(instance.refs.settingsMenu.removeEventListener).toHaveBeenCalled();
  });
});
