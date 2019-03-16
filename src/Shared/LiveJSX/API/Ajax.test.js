/** global: jest */

import React from 'react';
import Ajax from './Ajax';
import Babel from './Babel';

describe('LiveJSX Ajax API', function liveJsxApiTest() {
  it('Load and convert template', function testLoadAndConvert(done) {
    global.fetch = jest.fn().mockImplementation(url => {
      expect(url).toBe('publicUrl/template');

      return Promise.resolve({
        text: () => 'DATA'
      });
    });

    const jsx = <div>JSX</div>;
    const templateGenerator = new Babel({});
    templateGenerator.generate = jest.fn().mockImplementation(
      text => {
        expect(text).toBe('DATA');
        return Promise.resolve(jsx);
      }
    );

    const api = new Ajax('publicUrl/', templateGenerator);

    api.loadTemplate('template')
      .then(data => {
        expect(data).toBe(jsx);
        done();
      })
    ;
  });
});
