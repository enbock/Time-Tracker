import ValueObserver from '@enbock/state-value-observer/ValueObserver';
import Container from './Container';
import Manager from './Manager';
import Translator from './Translator';

jest.mock(
  '@enbock/simple-storage/DataStorage',
  () => () => ({
    loadData: jest.fn(),
    attach: jest.fn().mockReturnValue({onChange: jest.fn()})
  })
);

describe('Language.Container', () => {
  it('Get shared objects', () => {
    Container.activeTranslator.value = new Translator({});
    expect(Container.manager).toBeInstanceOf(Manager);
    expect(Container.observer).toBeInstanceOf(ValueObserver);
  });
});
