import * as MDC from '@material/select';
import {shallow} from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import Select from './Select';

jest.mock('@material/select', () => {
  const mockInstance = {
    destroy: jest.fn(),
    listen: jest.fn(),
    unlisten: jest.fn(),
    selectedOptions: ['option1'],
    selectedIndex: 1,
    value: 'option'
  };
  const mock = jest.fn().mockImplementation(
    function onCreate() {
      return mockInstance;
    }
  );
  return {
    mock: mockInstance,
    MDCSelect: mock
  };
});

jest.mock('react-dom', () => {
  const mock = {
    findDOMNode: jest.fn()
  };
  return {
    findDOMNode: mock.findDOMNode,
    getMock: function () {
      return mock;
    }
  };
});


describe('MDC: Select', function testMDCDrawer() {
  it('Emit event on change', function () {
    const domNode = {
      addEventListener: jest.fn()
    };

    const domMock = ReactDOM.getMock().findDOMNode;
    domMock.mockClear();
    domMock.mockReturnValue(domNode);

    MDC.mock.destroy.mockClear();

    /**
     * @param {Object} event
     */
    function checkEvent(event) {
    }

    let wrapper = shallow(
      <Select id="selectMenu" onChange={checkEvent} />
    );
    expect(MDC.mock.listen).toHaveBeenCalled();
    MDC.mock.listen.mock.calls[0][1](); // emulate emit

    wrapper.unmount();
    expect(MDC.mock.destroy).toHaveBeenCalled();
    expect(MDC.mock.unlisten).toHaveBeenCalled();
  });
});
