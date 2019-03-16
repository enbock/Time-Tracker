/** global: jest */

import Manager from './Manager';

describe('Language Manager', function testLanguageManager() {
  it('Register domain and change language', function testChangeLanguage() {
    const adapter = Manager.defaultAdapter;
    const translator = {onChange: jest.fn()};
    const factory = {
      createTranslator: jest.fn().mockImplementation(
        adapter => {
          expect(adapter).toBe(adapter);
          return translator;
        }
      )
    };
    const manager = new Manager('a', factory);
    adapter.getDomain = jest.fn();
    adapter.getDomain.mockReturnValue('Domain');

    let resultTranslator = manager.setup(adapter);
    expect(resultTranslator).toBe(translator);

    expect(factory.createTranslator).toHaveBeenCalled();
    expect(Object.keys(manager.domainList)).toEqual(['Domain']);
    expect(translator.onChange).toHaveBeenCalledWith('a');

    manager.change('b');
    expect(translator.onChange).toHaveBeenCalledTimes(2);
    expect(translator.onChange).toHaveBeenCalledWith('b');
  });
});
