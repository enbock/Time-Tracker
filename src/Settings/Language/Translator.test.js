/** global: jest */

import React from 'react';
import Translator from './Translator';

jest.mock('react-dom');

describe('Language Translator', function testLanguageTranslator() {
  let api, converter;

  beforeEach(() => {
    api = {loadLanguage: jest.fn()};
    converter = {convert: jest.fn()};
  });

  it('Loads the language file', function testLoadingLanguageFile(done) {
    api = {
      loadLanguage: jest.fn().mockImplementation((
        path => {
          expect(path).toBe('/Lang/foo_BAR/Test.yaml');

          return Promise.resolve('Yaml Text');
        }
      ))
    };
    converter = {
      convert: jest.fn().mockImplementation((
        text => {
          expect(text).toBe('Yaml Text');

          return Promise.resolve({test: {foo: 'bar'}, hello: 'world'});
        }
      ))
    };
    const adapter = {getDomain: () => 'Test', onChange: jest.fn()};
    const instance = new Translator(adapter, api, converter);
    instance.onChange('');
    instance.onChange('foo_BAR');
    setTimeout(
      () => {

        expect(instance.translations['test.foo']).toBe('bar');
        expect(adapter.onChange).toHaveBeenCalledWith('foo_BAR');
        done();
      }
    );
  });

  it('Failed to load the language file', function testFailedLoadingLanguageFile() {
    api = {
      loadLanguage: jest.fn().mockImplementation((
        path => {
          expect(path).toBe('/Lang/foo_BAR/Test.yaml');
          return Promise.reject('error');
        }
      ))
    };
    const orgConsole = global.console, logMock = jest.fn();
    global.console = {error: logMock};

    const adapter = {getDomain: () => 'Test', onChange: jest.fn()};
    const instance = new Translator(adapter, api, converter);
    instance.onChange('foo_BAR');
    setTimeout(
      () => {
        expect(instance.translations).toEqual({});
        expect(adapter.onChange).not.toHaveBeenCalled();
        expect(logMock).toHaveBeenCalledWith('error');
        global.console = orgConsole;
        done();
      }
    );
  });

  it('Translate a key', function testTranslation() {
    const instance = new Translator({}, api, converter);
    instance.translations = {foo: 'bar'};
    expect(instance.translate('foo')).toBe('bar');
  });

  it('Translate wrong key to empty string', function testFallbackTranslation() {
    const instance = new Translator({}, api, converter);
    expect(instance.translate('foo')).toBe('');
  });
});
