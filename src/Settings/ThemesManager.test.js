import React from 'react';
import {shallow} from 'enzyme';
import ThemesManager from './ThemesManager';

jest.mock('react-dom');
jest.mock('../Shared/Style', () => 'style');

/**
 * Test Settings Container.
 */
describe('Themes Manager', function testThemesManager() {
  /**
   * Test setup.
   */
  beforeEach(function setup() {

  });

  /**
   * Test change language.
   */
  it('Load CSS for theme', function () {
    const wrapper = shallow(<ThemesManager themes={{'test': 'Test.css'}} theme="test"/>);
    wrapper.setProps({});

    expect(wrapper.html()).toBe('<style src="/Style/Themes/Test.css"></style>');
  });
});
