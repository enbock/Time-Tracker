import React from 'react';
import {shallow} from 'enzyme';
import Select from './Select';
import ReactDOM from 'react-dom';
import * as MDC from '@material/select';


jest.mock('@material/select', () => {
  const mockInstance = {
    destroy: jest.fn(),
    listen: jest.fn(),
    unlisten: jest.fn(),
    selectedOptions: ["option1"],
    selectedIndex: 1,
    value: "option"
  };
  const mock         = jest.fn().mockImplementation(
    function onCreate() {
      return mockInstance;
    }
  );
  return {
    mock:       mockInstance,
    MDCSelect:  mock,
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
 * Test select interaction.
 */
describe('MDC: Select', function testMDCDrawer() {
  it("Emit event on change", function() {
    let wasChanged = false;

    const domNode = {
      addEventListener: jest.fn()
    };

    const domMock = ReactDOM.getMock().findDOMNode;
    domMock.mockClear();
    domMock.mockReturnValue(domNode);

    MDC.mock.destroy.mockClear();

    /**
     * Callback helper.
     * @param {Object} event
     */
    function checkEvent(event)
    {
      wasChanged = true;
    }

    let wrapper = shallow(
      <Select name="selectMenu" onChange={checkEvent}/>
    );
    expect(MDC.mock.listen).toHaveBeenCalled();
    MDC.mock.listen.mock.calls[0][1](); // emulate emit


    wrapper.unmount();
    expect(MDC.mock.destroy).toHaveBeenCalled();
    expect(MDC.mock.unlisten).toHaveBeenCalled();
  });
});
