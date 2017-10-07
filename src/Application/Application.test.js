import {mockAxiosAction} from 'axios';
import React from 'react';
import {shallow} from 'enzyme';
import Application from './Application';

/**
 * Test Application Container.
 */
describe('Application', function testApplication() {

  /**
   * Test if correct layout loaded.
   */
  it('Loads the correct layout', function testLoadLayout() {
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

    let success = false;

    mockAxiosAction(
      'get',
      function onRequest(url) {
        expect(url).toBe('/Template/Application.html.tpl');

        success = true;

        return promise;
      }
    );

    shallow(<Application/>);
    bound({data: 'TEMPLATE'});
    expect(success).toBe(true);
  });
});
