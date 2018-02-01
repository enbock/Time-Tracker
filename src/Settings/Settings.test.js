/** global: jest */

import {mockAxiosAction} from 'axios';
import React from 'react';
import {shallow} from 'enzyme';
import Settings from './Settings';

jest.mock('react-dom');


/**
 * Test Settings Container.
 */
describe('Settings Page', function testSettings() {
  let bound, promise;

  /**
   * Test setup.
   */
  beforeEach(function setup() {
    bound   = null;
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
        expect(url).toBe('/Template/Settings.html.tpl');

        return promise;
      }
    );
  });

  /**
   * Test change language.
   */
  it('Change language', function () {
    let language = '';

    /**
     * Checker for change.
     */
    function changeHelper(lang) {
      language = lang;
    }

    const lang = {
      setup: function (adapter) {
        adapter.onChange('test');
        expect(adapter.getDomain()).toBe('Settings');
      }
    };

    const wrapper = shallow(<Settings lang={lang} onThemesChange={jest.fn()} onLanguageChange={changeHelper}/>);
    let instance  = wrapper.instance();
    bound({data: 'TEMPLATE'});
    wrapper.setProps({});

    instance.onSelectionChange(
      {
        name: 'dummy'
      }
    );
    instance.onSelectionChange(
      {
        name:            'language',
        selectedOptions: ['german'],
        selectedIndex:   1,
        value:           'german'
      }
    );
    expect(instance.state.language).toBe('test');
    expect(language).toBe('german');

    wrapper.unmount();
  });

  /**
   * Test change color.
   */
  it('Change theme', function () {
    let theme = '';

    /**
     * Checker for change.
     */
    function changeHelper(value) {
      theme = value;
    }

    const wrapper = shallow(<Settings
      lang={{setup: jest.fn()}}
      onThemesChange={changeHelper}
      onLanguageChange={jest.fn()}
    />);
    let instance  = wrapper.instance();
    bound({data: 'TEMPLATE'});
    wrapper.setProps({});

    instance.onSelectionChange(
      {
        name:            'color',
        selectedOptions: ['google'],
        selectedIndex:   1,
        value:           'google'
      }
    );

    expect(theme).toBe('google');

  });
});
