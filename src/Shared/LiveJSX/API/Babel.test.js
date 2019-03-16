/** global: jest */

import Babel from './Babel';

describe('LiveJsx Generation API', function testGenerationApi() {
  it('Convert template to jsx', function testConversion() {
    const transformOptions = {options: 1};
    const babelLibrary = {
      transform: jest.fn().mockImplementation(
        (template, options) => {
          expect(template).toBe('<div className="test" />');
          expect(options).toBe(transformOptions);

          return {code: 'React.createElement("test")'};
        }
      )
    };
    const api = new Babel(transformOptions);
    api.Babel = babelLibrary; // external load

    const code = api.generate('<div class="test" />');
    expect(code.toString()).toBe('function anonymous() {\n'
      + 'return React.createElement("test")\n'
      + '}'
    );
  });
});
