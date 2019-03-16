/** global: jest */

import Ajax from './Ajax';

describe('Language Ajax API', function testLanguageApiTest() {
  it('Load and convert to text', function testLoadAjaxAsText(done) {
    global.fetch = jest.fn().mockImplementation(url => {
      expect(url).toBe('publicUrl/language/file');

      return Promise.resolve({
        text: () => 'DATA'
      });
    });

    const api = new Ajax('publicUrl/');

    api.loadLanguage('language/file')
      .then(data => {
        expect(data).toBe('DATA');
        done();
      })
    ;
  });
});
