import {mockAxiosAction} from 'axios';
import React from 'react';
import {shallow} from 'enzyme';
import Main from './Main';

jest.mock('@material/drawer', () => {
  return {
    MDCPersistentDrawer: jest.fn()
  };
});
jest.mock('react-dom', () => {
  return {
    findDOMNode: jest.fn()
  };
});

/**
 * Test Main Container.
 */
describe('Main Menu', function testMain() {

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
        expect(url).toBe('/Template/Menu/Main.html.tpl');
        success = true;

        return promise;
      }
    );

    const wrapper = shallow(<Main/>);
    bound({data: 'TEMPLATE'});
    wrapper.setProps({open: false});
    wrapper.setProps({open: true});
    expect(success).toBe(true);
  });
});
