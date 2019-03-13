/** global: jest */

import Manager from './Manager';
import Translator from './Translator';

jest.mock('react-dom');
jest.mock(
  './Translator',
  function createTranslatorMock() {
    return {factory: jest.fn()};
  }
);

describe('Language Manager', function testLanguageManager() {
  it('Register domain and change language', function testChangeLanguage() {
    const manager = new Manager('a');
    const translator = {onChange: jest.fn()};
    Translator.factory.mockReturnValue(translator);
    const adapter = Manager.defaultAdapter;
    adapter.getDomain = jest.fn();
    adapter.getDomain.mockReturnValue('Domain');

    let resultTranslator = manager.setup(adapter);
    expect(resultTranslator).toBe(translator);

    expect(Translator.factory).toHaveBeenCalled();
    expect(Object.keys(manager.domainList)).toEqual(['Domain']);
    expect(translator.onChange).toHaveBeenCalledWith('a');

    manager.change('b');
    expect(translator.onChange).toHaveBeenCalledTimes(2);
    expect(translator.onChange).toHaveBeenCalledWith('b');
  });
});
