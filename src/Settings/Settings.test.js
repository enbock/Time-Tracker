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

    const wrapper = shallow(<Settings lang={lang} themesManager={{}} themeChangeInteractor={{}}/>);
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

  it('Change activeTheme', function (done) {
    const themeChangeInteractor = {
      interact: jest.fn(
        /**
         * @param {Request}request
         * @param {Response} response
         */
        (request, response) => {
          response.theme = 'theme';
          response.file = 'file';
          response.isChanged = true;
        }
      )
    };

    const adapter = {
      onThemeChange: function (name, file) {
          expect(name).toBe('theme');
          expect(file).toBe('file');
          done();
      }
    };

    const wrapper = shallow(<Settings
      lang={{setup: jest.fn()}}
      themesManager={{adapter: adapter}}
      themeChangeInteractor={themeChangeInteractor}
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

    expect(themeChangeInteractor.interact).toHaveBeenCalledTimes(1);
    expect(themeChangeInteractor.interact.mock.calls[0][0].newTheme).toBe('google');
  });

  it('Done change already active theme', function () {
    const themeChangeInteractor = {
      interact: jest.fn(
        /**
         * @param {Request}request
         * @param {Response} response
         */
        (request, response) => {
          response.theme = 'theme';
          response.file = 'file';
          response.isChanged = false;
        }
      )
    };

    const adapter = {
      onThemeChange: jest.fn()
    };

    const wrapper = shallow(<Settings
      lang={{setup: jest.fn()}}
      themesManager={{adapter: adapter}}
      themeChangeInteractor={themeChangeInteractor}
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

    expect(themeChangeInteractor.interact).toHaveBeenCalledTimes(1);
    expect(adapter.onThemeChange).not.toHaveBeenCalled();
  });
});
