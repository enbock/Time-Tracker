/** global: jest */

import {shallow} from 'enzyme';
import React from 'react';
import LiveJSX from './LiveJSX';

jest.mock('react-dom');

describe('LiveJSX', function testLiveJSX() {
  it('Loads per template from property', function testLoadByProperty(done) {

    const templateLoader = {
      loadTemplate: jest.fn().mockImplementation(template => {
        expect(template).toBe('the_template');
        return Promise.resolve(() => <div>JSX</div>);
      })
    };

    const wrapper = shallow(<LiveJSX templateLoader={templateLoader} />);
    wrapper.setProps({template: 'the_template'});
    expect(wrapper.html()).toBe('<div class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>');
    expect(templateLoader.loadTemplate).toHaveBeenCalledTimes(1);
    setTimeout( // next cycle
      () => {
        wrapper.setProps({});
        expect(wrapper.html()).toBe('<div>JSX</div>');
        done();
      },
      1
    );
  });

  it('Fails to load template', function testLoadingFail(done) {
    // Backup for this test case
    const orgConsole = global.console;

    const templateLoader = {
      loadTemplate: jest.fn().mockImplementation(template => {
        expect(template).toBe('the_template');
        return Promise.reject('Error');
      })
    };

    const logMock = jest.fn();
    global.console = {error: logMock};

    shallow(<LiveJSX templateLoader={templateLoader} template="the_template" />);
    setTimeout( // next cycle
      () => {
        expect(logMock).toHaveBeenCalledTimes(1);
        expect(logMock.mock.calls[0]).toEqual(['Error']);
        // Restore
        global.console = orgConsole;
        done();
      },
      1
    );
  });
});
