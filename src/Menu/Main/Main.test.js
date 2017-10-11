import {mockAxiosAction} from 'axios';
import React from 'react';
import {shallow} from 'enzyme';
import Main from './Main';


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

    let wasOpen  = false;
    let wasClose = false;

    const wrapper = shallow(<Main className="test" onOpen={() => wasOpen = true} onClose={() => wasClose = true}/>);
    bound({data: 'TEMPLATE'});
    expect(success).toBe(true);

    let instance = wrapper.instance();
    instance.onOpen();
    instance.onClose();
    expect(wasOpen).toBe(true);
    expect(wasClose).toBe(true);


    // cover else path
    const wrapperCov = shallow(<Main className="test"/>);
    instance = wrapperCov.instance();
    instance.onOpen();
    instance.onClose();
  });
});
