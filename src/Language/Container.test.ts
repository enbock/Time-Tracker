import Observer from '../Observer/Observer';
import Container from './Container';
import Manager from './Manager';
import Translator from './Translator';

describe('Language.Container', () => {
  it('Get shared objects', () => {
    Container.activeTranslator.value = new Translator({});
    expect(Container.manager).toBeInstanceOf(Manager);
    expect(Container.observer).toBeInstanceOf(Observer);
  });
});