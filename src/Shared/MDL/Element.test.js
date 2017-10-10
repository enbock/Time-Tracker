import React from 'react';
import MDLElement from './Element';
import renderer from 'react-test-renderer';

/**
 * Test MDL Element.
 */
describe('MDL Element', function testMdlElement() {

  /**
   * Test adding and removal.
   */
  it('Add and removes itself from list', function testAddAndRemove() {

    const componentHandler = {
      downgradeElements: jest.fn(),
      upgradeDom:        jest.fn()
    };

    global.componentHandler = componentHandler;

    const component = renderer.create(<MDLElement>Test</MDLElement>);
    renderer.create(<MDLElement>Test 2</MDLElement>); // just a second node

    component.unmount();
    delete global.componentHandler;

    expect(componentHandler.upgradeDom.mock.calls.length).toBe(2);
    expect(componentHandler.downgradeElements.mock.calls.length).toBe(2);
    expect(componentHandler.downgradeElements.mock.calls[0][0].children[0].text).toBe('Test'); // it was the element
    expect(componentHandler.downgradeElements.mock.calls[1][0].children[0].text).toBe('Test'); // it was the element

  });

});

