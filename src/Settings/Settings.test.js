import {mockAxiosAction} from 'axios';
import React from 'react';
import {shallow} from 'enzyme';
import Settings from './Settings';

jest.mock('react-dom');


/**
 * Test Settings Container.
 */
describe('Settings Page', function testSettings() {
  let bound, templateLoaded, promise;

  /**
   * Test setup.
   */
  beforeEach(function setup() {
    bound     = null;
    promise = {
      then:  function onThen(callback) {
        bound = callback;
        return promise;
      },
      catch: function onCatch() {
        return promise;
      }
    };

    templateLoaded = false;

    mockAxiosAction(
      'get',
      function onRequest(url) {
        expect(url).toBe('/Template/Settings.html.tpl');
        templateLoaded = true;

        return promise;
      }
    );
  });

  /**
   * Test change language.
   */
  it('Change language', function () {
    /**
     * Checker for change.
     */
    function changeHelper() {

    }

    const wrapper = shallow(<Settings onThemesChange={changeHelper}/>);
    let instance  = wrapper.instance();
    bound({data: 'TEMPLATE'});
    wrapper.setProps({});

    instance.onSelectionChange(
      {
        name:            'language',
        selectedOptions: ['german'],
        selectedIndex:   1,
        value:           'german'
      }
    );

    wrapper.unmount();
  });

  /**
   * Test change color.
   */
  it('Change language', function () {
    let theme = '';
    /**
     * Checker for change.
     */
    function changeHelper(value) {
      theme = value;
    }
    const wrapper = shallow(<Settings onThemesChange={changeHelper}/>);
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
