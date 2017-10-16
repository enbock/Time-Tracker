import {mockAxiosAction} from 'axios';
import React from 'react';
import {shallow} from 'enzyme';
import Settings from './Settings';

jest.mock('react-dom');


/**
 * Test Settings Container.
 */
describe('Settings Page', function testSettings() {

  /**
   * Test change language.
   */
  it('Change language', function () {
    let bound     = null;
    const promise = {
      then:  function onThen(callback) {
        bound = callback;
        return promise;
      },
      catch: function onCatch() {
        return promise;
      }
    };

    let templateLoaded = false;

    mockAxiosAction(
      'get',
      function onRequest(url) {
        expect(url).toBe('/Template/Settings.html.tpl');
        templateLoaded = true;

        return promise;
      }
    );

    const wrapper = shallow(<Settings/>);
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
});
