import React from 'react';
import {shallow} from 'enzyme';
import Manager from './Manager';
import Translator from './Translator';

jest.mock('react-dom');
jest.mock(
  './Translator',
  function createTranslatorMock() {
    return {factory: jest.fn()};
  }
);

/**
 * Test Settings Container.
 */
describe('Language Manager', function testLanguageManager() {

  /**
   * Test register domain and change language.
   */
  it('Register domain and change language', function testChangeLanguage() {
    const wrapper    = shallow(<Manager language="a"/>);
    const translator = {onChange: jest.fn()};
    Translator.factory.mockReturnValue(translator);
    const adapter     = Manager.defaultAdapter;
    const instance    = wrapper.instance();
    adapter.getDomain = jest.fn();
    adapter.getDomain.mockReturnValue('Domain');

    let resultTranslator = instance.setup(adapter);
    expect(resultTranslator).toBe(translator);

    expect(Translator.factory).toHaveBeenCalled();
    expect(Object.keys(instance.domainList)).toEqual(['Domain']);
    expect(translator.onChange).toHaveBeenCalledWith('a');

    wrapper.setProps({language: 'b'});
    wrapper.setProps({language: 'b'}); // cover ignore already set value
    expect(translator.onChange).toHaveBeenCalledTimes(2);
    expect(translator.onChange).toHaveBeenCalledWith('b');

    expect(wrapper.html()).toBe(null);
  });
});
