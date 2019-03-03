/** global: jest */

import {shallow} from 'enzyme';
import React from 'react';
import Style from './Style';

jest.mock('react-dom');
jest.mock('../../Shared/Style');

describe('Theme Style', function testThemeStyle() {

  it('Load style', function testLoadStyle() {
    const themesManager = {
      setAdapter: jest.fn()
    };

    const wrapper = shallow(<Style themesManager={themesManager} />);

    expect(wrapper.find('Style').length).toBe(0);

    expect(themesManager.setAdapter).toHaveBeenCalledTimes(1);
    themesManager.setAdapter.mock.calls[0][0].onThemeChange('dummy', 'File.css');
    wrapper.update();
    expect(wrapper.find('Style').prop('src')).toBe('/Style/Themes/File.css');
  });
});
