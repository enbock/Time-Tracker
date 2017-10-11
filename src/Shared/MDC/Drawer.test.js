import React from 'react';
import {shallow} from 'enzyme';
import Drawer from './Drawer';
import ReactDOM from 'react-dom';
import * as MDC from '@material/drawer';

jest.mock('@material/drawer', () => {
  const mockInstance = {
    destroy: jest.fn()
  };
  const mock         = jest.fn().mockImplementation(
    function onCreate() {
      return mockInstance;
    }
  );
  return {
    mock:                mockInstance,
    MDCTemporaryDrawer:  mock,
    MDCPersistentDrawer: mock
  };
});

jest.mock('react-dom', () => {
  const mock = {
    findDOMNode: jest.fn()
  };
  return {
    findDOMNode: mock.findDOMNode,
    getMock:     function () {
      return mock;
    }
  };
});

/**
 * Test drawer interaction.
 */
describe('MDC: Drawer', function testMDCDrawer() {

  /**
   * Test temporary drawer.
   */
  it('Connect temporary drawer', function testTemporaryDrawer() {
    let wasOpen = false, wasClose = false;

    const domNode = {
      addEventListener: jest.fn()
    };

    const domMock = ReactDOM.getMock().findDOMNode;
    domMock.mockClear();
    domMock.mockReturnValue(domNode);

    MDC.mock.destroy.mockClear();

    let wrapper = shallow(
      <Drawer
        className="mdc-temporary-drawer"
        onOpen={() => wasOpen = true}
        onClose={() => wasClose = true}
      />
    );
    wrapper.setProps({open: true});

    expect(domNode.addEventListener.mock.calls[0][0]).toBe('MDCTemporaryDrawer:open');
    expect(domNode.addEventListener.mock.calls[1][0]).toBe('MDCTemporaryDrawer:close');

    domNode.addEventListener.mock.calls[0][1]();
    expect(wasOpen).toBe(true);
    domNode.addEventListener.mock.calls[1][1]();
    expect(wasClose).toBe(true);

    wrapper.unmount();
    expect(MDC.mock.destroy).toHaveBeenCalled();
  });

  /**
   * Test persistent drawer.
   */
  it('Connect persistent drawer', function testTemporaryDrawer() {
    let wasOpen = false, wasClose = false;

    const domNode = {
      addEventListener: jest.fn()
    };

    const domMock = ReactDOM.getMock().findDOMNode;
    domMock.mockClear();
    domMock.mockReturnValue(domNode);

    MDC.mock.destroy.mockClear();

    let wrapper = shallow(
      <Drawer className="mdc-persistent-drawer"/>
    );
    wrapper.setProps({open: true});

    expect(domNode.addEventListener.mock.calls[0][0]).toBe('MDCPersistentDrawer:open');
    expect(domNode.addEventListener.mock.calls[1][0]).toBe('MDCPersistentDrawer:close');

    // cover else bound branch
    domNode.addEventListener.mock.calls[0][1]();
    domNode.addEventListener.mock.calls[1][1]();

    wrapper.unmount();
    expect(MDC.mock.destroy).toHaveBeenCalled();
  });
  /**
   * Test persistent drawer.
   */
  it('Do nothing on passive drawer', function testTemporaryDrawer() {
    let wasOpen = false, wasClose = false;

    const domNode = {
      addEventListener: jest.fn()
    };

    const domMock = ReactDOM.getMock().findDOMNode;
    domMock.mockClear();
    domMock.mockReturnValue(domNode);

    MDC.mock.destroy.mockClear();

    let wrapper = shallow(
      <Drawer className="mdc-permanent-drawer"/>
    );
    // Cover else branch
    wrapper.setProps({open: true});

    // check default branch
    expect(domNode.addEventListener).toHaveBeenCalledTimes(0);

    // Cover else branch
    wrapper.unmount();
    expect(MDC.mock.destroy).toHaveBeenCalledTimes(0);
  });
});
