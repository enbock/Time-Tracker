import {mockAxiosAction} from 'axios';
import React from 'react';
import {shallow} from 'enzyme';
import Application from './Application';

jest.mock('../Menu', () => 'Menu');

/**
 * Test Application Container.
 */
describe('Application', function testApplication() {
  /**
   * Reset global mocks.
   */
  beforeEach(function beforeEach() {
    Babel.transform.mockClear();
  });


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
    Babel.transform.mockReturnValue(
      {
        code: 'React.createElement(\'button\', { onClick: this.onMenuButtonClick.bind(this) })'
      }
    );

    const wrapper = shallow(<Application/>);
    bound({data: 'TEMPLATE'});
    wrapper.update();
    wrapper.find('button').simulate('click');
    expect(success).toBe(true);
  });
});
