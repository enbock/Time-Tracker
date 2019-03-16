/** global: jest */

import {shallow} from 'enzyme';
import React from 'react';
import Main from './Main';

jest.mock('react-dom');

describe('Main Menu', function testMain() {
  let templateLoader;

  beforeEach(function setup() {
    templateLoader = {
      loadTemplate: jest.fn().mockImplementation(template => {
        return Promise.resolve(() => <div>JSX</div>);
      })
    };
  });

  it('Do interactions', function testLoadLayout(done) {
    const mainMenuRegisterManager = {
      change: jest.fn(),
      registerMenuToggleHandler: jest.fn(),
      deregisterMenuToggleHandler: jest.fn()
    };

    const wrapper = shallow(
      <Main
        template="template"
        templateLoader={templateLoader}
        mainMenuRegisterManager={mainMenuRegisterManager}
      />);
    let instance = wrapper.instance();
    instance.refs = {
      settingsMenu: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      }
    };
    setTimeout(
      () => {
        instance.onMenuClick('one');
        expect(mainMenuRegisterManager.registerMenuToggleHandler).toHaveBeenCalled();
        expect(mainMenuRegisterManager.change).toHaveBeenCalledWith('one');
        mainMenuRegisterManager.registerMenuToggleHandler.mock.calls[0][0]();
        expect(wrapper.instance().state.open).toBe(true);

        wrapper.unmount();
        expect(mainMenuRegisterManager.deregisterMenuToggleHandler).toHaveBeenCalled();
        expect(instance.refs.settingsMenu.removeEventListener).toHaveBeenCalled();

        done();
      },
      1
    );
  });
});
