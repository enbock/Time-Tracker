/** global: jest */

import {mockAxiosAction} from 'axios';
import React from 'react';
import Translator from './Translator';
import YAML from 'yamljs';

jest.mock('react-dom');

/**
 * Test language translator.
 */
describe('Language Translator', function testLanguageTranslator() {
  /**
   * Make axios mock.
   * @param promise
   */
  function mockAxios(promise) {
    mockAxiosAction(
      'get',
      function onRequest(url) {
        expect(url).toBe('/Lang/foo_BAR/Test.yaml');

        return promise;
      }
    );
  }

  /**
   * Test loading the language yaml.
   */
  it('Loads the language file', function testLoadingLanguageFile() {
    let bound     = null;
    const promise = {
      then:  function onThen(callback) {
        bound = callback;
        return promise;
      },
      catch: function onCatch() {
        return promise;
      }
    };
    mockAxios(promise);

    const adapter  = {getDomain: () => 'Test', onChange: jest.fn()};
    const instance = Translator.factory(adapter);
    instance.onChange('');
    expect(bound).toBe(null);
    instance.onChange('foo_BAR');
    bound({data: YAML.stringify({test: {foo: 'bar'}, hello: 'world'})});

    expect(instance.translations['test.foo']).toBe('bar');
    expect(instance.translations['hello']).toBe('world');
    expect(adapter.onChange).toHaveBeenCalled();
    expect(adapter.onChange).toHaveBeenCalledWith('foo_BAR');
    expect(adapter.onChange).toHaveBeenCalledTimes(1);
  });

  /**
   * Test failing of loading the language yaml.
   */
  it('Failed to load the language file', function testFailedLoadingLanguageFile() {
    // Backup for this test case
    const orgConsole = global.console;
    const logMock    = jest.fn();
    global.console   = {error: logMock};
    let bound        = null;
    const promise    = {
      then:  function onThen() {
        return promise;
      },
      catch: function onCatch(callback) {
        bound = callback;
        return promise;
      }
    };

    mockAxios(promise);

    const adapter  = {getDomain: () => 'Test', onChange: jest.fn()};
    const instance = new Translator(adapter);
    instance.onChange('foo_BAR');
    bound('error');

    expect(instance.translations).toEqual({});
    expect(adapter.onChange).not.toHaveBeenCalled();
    expect(logMock).toHaveBeenCalledWith('error');
    // Restore
    global.console = orgConsole;
  });

  /**
   * Test translation.
   */
  it('Translate a key', function testTranslation() {
    const instance        = new Translator({});
    instance.translations = {foo: 'bar'};
    expect(instance.translate('foo')).toBe('bar');
  });

  /**
   * Test fallback translation.
   */
  it('Translate wrong key to empty string', function testFallbackTranslation() {
    const instance = new Translator({});
    expect(instance.translate('foo')).toBe('');
  });
});
