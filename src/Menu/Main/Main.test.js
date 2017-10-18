import {mockAxiosAction} from 'axios';
import React from 'react';
import {shallow} from 'enzyme';
jest.mock('react-dom');
import Main from './Main';


/**
 * Test Main Container.
 */
describe('Main Menu', function testMain() {

  /**
   * Test if correct layout loaded.
   */
  it('Loads layout and do interactions', function testLoadLayout() {
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

    let wasMenu = "";
    let registeredHandler = false;

    const adapter =  {
      registerMenuToggleHandler: (handler) => registeredHandler = handler,
      deregisterMenuToggleHandler: jest.fn()
    };

    const wrapper = shallow(<Main adapter={adapter} className="test" onMenu={(menu) => wasMenu = menu}/>);
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
    expect(registeredHandler).not.toBe(false);
    registeredHandler();

    instance.onMenuClick("one");
    expect(wasMenu).toBe("one");

    wrapper.unmount();
    expect(instance.refs.settingsMenu.removeEventListener).toHaveBeenCalled();


    // cover else path
    const wrapperCov = shallow(<Main className="test"/>);
    instance = wrapperCov.instance();
    instance.onMenuClick("two");
  });
});
