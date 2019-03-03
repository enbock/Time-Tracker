/** global: jest */

import {mockAxiosAction} from 'axios';
import React from 'react';
import YAML from 'yamljs';
import Translator from './Translator';

jest.mock('react-dom');

describe('Language Translator', function testLanguageTranslator() {
  it('Loads the language file', testLoadingLanguageFile);
  it('Failed to load the language file', testFailedLoadingLanguageFile);

  it('Translate a key', function testTranslation() {
    const instance = new Translator({});
    instance.translations = {foo: 'bar'};
    expect(instance.translate('foo'))
      .toBe('bar');
  });

  it('Translate wrong key to empty string', function testFallbackTranslation() {
    const instance = new Translator({});
    expect(instance.translate('foo'))
      .toBe('');
  });
});


/**
 * @param thenCall
 * @param catchCall
 */
function mockAxios(thenCall, catchCall) {
  const promise = {
    then: function onThen(callback) {
      thenCall(callback);
      return promise;
    },
    catch: function onCatch(callback) {
      catchCall(callback);
      return promise;
    }
  };
  mockAxiosAction(
    'get',
    function onRequest(url) {
      expect(url)
        .toBe('/Lang/foo_BAR/Test.yaml');

      return promise;
    }
  );
}

function testFailedLoadingLanguageFile() {
  const orgConsole = global.console, logMock = jest.fn();
  global.console = {error: logMock};
  let bound = null;
  mockAxios(jest.fn(), (callback) => bound = callback);

  const adapter = {getDomain: () => 'Test', onChange: jest.fn()};
  const instance = new Translator(adapter);
  instance.onChange('foo_BAR');
  bound('error');

  expect(instance.translations)
    .toEqual({});
  expect(adapter.onChange)
    .not
    .toHaveBeenCalled();
  expect(logMock)
    .toHaveBeenCalledWith('error');
  global.console = orgConsole;
}

/**
 * Test failing of loading the language yaml.
 */
function testLoadingLanguageFile() {
  let bound = null;
  mockAxios((callback) => bound = callback, jest.fn());

  const adapter = {getDomain: () => 'Test', onChange: jest.fn()};
  const instance = Translator.factory(adapter);
  instance.onChange('');
  expect(bound)
    .toBe(null);
  instance.onChange('foo_BAR');
  bound({data: YAML.stringify({test: {foo: 'bar'}, hello: 'world'})});

  expect(instance.translations['test.foo'])
    .toBe('bar');
  expect(adapter.onChange)
    .toHaveBeenCalledWith('foo_BAR');
}
