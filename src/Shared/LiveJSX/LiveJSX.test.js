import {mockAxiosAction} from 'axios';
import React from 'react';
import {shallow} from 'enzyme';
jest.mock('react-dom');
import LiveJSX from './LiveJSX';

/**
 * Test JSX loader component.
 */
describe('LiveJSX', function testLiveJSX() {
  /**
   * Reset global mocks.
   */
  beforeEach(function beforeEach() {
    Babel.transform.mockClear();
  });

  /**
   * Test if correct layout loaded.
   */
  it('Loads per template from property', function testLoadByProperty() {
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

    mockAxiosAction(
      'get',
      function onRequest(url) {
        expect(url).toBe('the_template.url');


        return promise;
      }
    );

    Babel.transform.mockReturnValue(
      {
        code: 'React.createElement(\'div\',null,\'JSX\')'
      }
    );

    const wrapper = shallow(<LiveJSX />);
    wrapper.setProps({template: "the_template.url"});
    bound({data: 'TEMPLATE'});
    wrapper.setProps({}); // update component again (wrapper.update() seems not executing the life cycle)
    expect(wrapper.html()).toBe('<div>JSX</div>');
    expect(Babel.transform.mock.calls[0]).toEqual(['TEMPLATE', {presets: ['react']}]);
  });

  /**
   * Test fail of loading..
   */
  it('Fails to load template', function testLoadingFail() {
    // Backup for this test case
    const orgConsole = global.console;

    let bound     = null;
    const promise = {
      then:  function onThen() {
        return promise;
      },
      catch: function onCatch(callback) {
        bound = callback;
        return promise;
      }
    };

    mockAxiosAction(
      'get',
      function onRequest() {
        return promise;
      }
    );

    const logMock = jest.fn();

    global.console = {
      error: logMock
    };

    const wrapper = shallow(<LiveJSX template="the_template.url"/>);
    bound("Error");
    wrapper.update();
    expect(logMock.mock.calls[0]).toEqual(["Error"]);
    expect(Babel.transform.mock.calls.length).toBe(0);

    // Restore
    global.console = orgConsole;
  });
});
