import {shallow} from 'enzyme';
import React from 'react';
import Style from './Style';

/**
 * Test the style loader.
 */
describe('Shared: Style', function testSharedStyle() {

  /**
   * Test that url passing correctly.
   */
  it('Loads css file', function testFileLoad() {
    const wrapper = shallow(<Style src="/test.css" />);
    expect(wrapper.html()).toBe('<link rel="stylesheet" href="/test.css"/>');
  });

  /**
   * Test that url not passed if not enabled.
   */
  it('Turn off if not enabled', function testFileLoad() {
    const wrapper = shallow(<Style src="/test.css" enabled={false} />);
    expect(wrapper.html()).toBe('<link rel="stylesheet" href=""/>');
  });
});
