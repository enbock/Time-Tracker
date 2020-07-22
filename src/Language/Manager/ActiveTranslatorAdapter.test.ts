import {Observer, ObserverAdapter} from '@enbock/state-value-observer/ValueObserver';
import Manager from '../Manager';
import Translator from '../Translator';
import ActiveTranslatorAdapter from './ActiveTranslatorAdapter';

describe('Language.Manager.ActiveTranslatorAdapter', () => {
  it('Load translator before passing new language to observer', (done) => {
    const baseAdapter: ObserverAdapter<string> = {onChange: jest.fn()},
      manager: Manager = new Manager({loadLanguage: jest.fn()}, {createTranslator: jest.fn()}),
      activeTranslator: Observer<Translator> = {
        value: new Translator({})
      },
      newTranslator = new Translator({new: 'yes'});

    manager.getTranslator = jest.fn().mockResolvedValue(newTranslator);
    const adapter: ActiveTranslatorAdapter = new ActiveTranslatorAdapter(baseAdapter, manager, activeTranslator);

    adapter.onChange('de-de');
    expect(baseAdapter.onChange).not.toHaveBeenCalled();

    setTimeout(
      () => {
        expect(activeTranslator.value).toBe(newTranslator);
        expect(baseAdapter.onChange).toHaveBeenCalledWith('de-de');
        done();
      },
      1
    );
  });
});
