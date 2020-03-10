import {IObserver, IObserverAdapter} from '../../Observer/Observer';
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

  onChange(oldValue: string, newValue: string): void {
    this.manager.getTranslator(newValue).then(
      (translator: Translator): void => {
        this.activeTranslator.value = translator;
        this.baseAdapter.onChange(oldValue, newValue);
      }
    );
  }
}