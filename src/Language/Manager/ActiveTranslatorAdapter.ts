import {Observer, ObserverAdapter} from '@enbock/state-value-observer/ValueObserver';
import Manager from '../Manager';
import Translator from '../Translator';

export default class ActiveTranslatorAdapter implements ObserverAdapter<string> {
  protected baseAdapter: ObserverAdapter<string>;
  protected manager: Manager;
  protected activeTranslator: Observer<Translator>;

  constructor(baseAdapter: ObserverAdapter<string>, manager: Manager, activeTranslator: Observer<Translator>) {
    this.activeTranslator = activeTranslator;
    this.baseAdapter = baseAdapter;
    this.manager = manager;
  }

  onChange(newValue: string): void {
    this.manager.getTranslator(newValue).then(
      (translator: Translator): void => {
        this.activeTranslator.value = translator;
        this.baseAdapter.onChange(newValue);
      }
    );
  }
}
