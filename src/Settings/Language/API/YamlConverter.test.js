/** global: jest */

import YamlConverter from './YamlConverter';

describe('Language Yaml API', function testLanguageYamlTest() {
  it('Convert text to yaml', function testConversion(done) {
    const yamlData = {yaml: 1};
    const yamljs = {
      parse: jest.fn().mockImplementation(text => {
        expect(text).toBe('yaml text');
        return yamlData;
      })
    };

    const converter = new YamlConverter(yamljs);
    converter.convert('yaml text')
      .then(
        data => {
          expect(data).toBe(yamlData);
          done();
        }
      )
    ;
  });
});
