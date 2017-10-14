import React from 'react';
import {shallow} from 'enzyme';
import Router from './Router';

/**
 * Test the router connection.
 * The router is more and adapter to global(window). So the test are not very precise and we can mostly only cover
 * the lines. If event correct bound, I don't see yet the way to validate it.
 *
 * Here is an window and History API-Polyfill active. So I can't overwrite the globals with own mocks.
 */
describe('Shared: Router', function testRouter() {
  let wrapper, lastEvent;

  /**
   * Handler that copied event to `lastEvent`.
   *
   * @param event
   */
  function onChange(event) {
    lastEvent = event;
  }

  /**
   * Create and mount router.
   */
  beforeEach(() => {
    lastEvent = {};
    wrapper   = shallow(<Router onChange={onChange} state={{}} pathname="/"/>);
    wrapper.setProps({});
  });

  /**
   * Test start of router.
   */
  it('Test change submit on start', function testSubmitOnStart() {
    expect(lastEvent.pathname).toBe('/');
    expect(lastEvent.state).toEqual(null);
    wrapper.unmount();
  });

  /**
   * Test change submit on route changes.
   */
  it('Test change page', function testSubmitOnChange() {
    const instance = wrapper.instance();
    wrapper.setProps({state: {foo: 'bar'}, pathname: '/newPage/'});
    expect(lastEvent.pathname).toBe('/newPage/');
    expect(lastEvent.state).toEqual({foo: 'bar'});

    // test (indirect) event firing
    instance.boundPopState({state: {foo: 'bar2'}});
    expect(lastEvent.state).toEqual({foo: 'bar2'});
  });
});
