import {IObserver, IObserverAdapter} from '@enbock/state-value-observer/Observer';
import Manager from '../Manager';
import Translator from '../Translator';

export default class ActiveTranslatorAdapter implements IObserverAdapter<string> {
  protected baseAdapter: IObserverAdapter<string>;
  protected manager: Manager;
  protected activeTranslator: IObserver<Translator>;

  constructor(baseAdapter: IObserverAdapter<string>, manager: Manager, activeTranslator: IObserver<Translator>) {
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
