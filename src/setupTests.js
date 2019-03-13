/* global: jest, Babel */

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'raf/polyfill';

// Configure React v16 for enzyme.
Enzyme.configure({adapter: new Adapter()});

// Storage mock.
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

// Mock Babel
global.Babel = {
  transform: jest.fn()
};

/**
 * Default return value.
 */
Babel.transform.mockReturnValue(
  {
    code: 'React.createElement(\'div\',null,\'JSX\')'
  }
);
