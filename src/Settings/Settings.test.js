/** global: jest */

import {mockAxiosAction} from 'axios';
import {shallow} from 'enzyme';
import React from 'react';
import Settings from './Settings';

jest.mock('react-dom');

describe('Settings Page', function testSettings() {
  let bound, promise;

  beforeEach(function setup() {
    bound = null;
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
        expect(url)
          .toBe('/Template/Settings.html.tpl');

        return promise;
      }
    );
  });

  it('Change language', function () {
    const lang = {
      setup: function (adapter) {
        adapter.onChange('test');
        expect(adapter.getDomain()).toBe('Settings');
      },
      change: jest.fn()
    };

    const themesManager = {
      changeTheme: jest.fn()
    };

    const wrapper = shallow(<Settings lang={lang} themesManager={themesManager} />);
    let instance = wrapper.instance();
    bound({data: 'TEMPLATE'});
    wrapper.setProps({});

    instance.onSelectionChange(
      {
        name: 'dummy'
      }
    );
    instance.onSelectionChange(
      {
        name: 'language',
        selectedOptions: ['german'],
        selectedIndex: 1,
        value: 'german'
      }
    );
    expect(lang.change).toHaveBeenCalledTimes(1);
    expect(lang.change).toHaveBeenCalledWith('german');

    wrapper.unmount();
  });

  it('Change activeTheme', function () {

    const themesManager = {
      changeTheme: jest.fn()
    };

    const wrapper = shallow(<Settings
      lang={{setup: jest.fn()}}
      themesManager={themesManager}
    />);

    let instance = wrapper.instance();
    bound({data: 'TEMPLATE'});
    wrapper.setProps({});

    instance.onSelectionChange(
      {
        name: 'color',
        selectedOptions: ['google'],
        selectedIndex: 1,
        value: 'google'
      }
    );

    expect(themesManager.changeTheme).toHaveBeenCalledTimes(1);
    expect(themesManager.changeTheme).toHaveBeenCalledWith('google');

  });
});
