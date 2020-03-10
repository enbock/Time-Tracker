import {IObserverAdapter, IOnChangeCallback} from '../Observer/Observer';

export default class StorageAdapter<T> implements IObserverAdapter<T> {
  protected baseAdapter: IObserverAdapter<T>;
  protected onChangeCallback: IOnChangeCallback<T>;

  constructor(baseAdapter: IObserverAdapter<T>, onChangeCallback: IOnChangeCallback<T>) {
    this.baseAdapter = baseAdapter;
    this.onChangeCallback = onChangeCallback;
  }

  onChange(oldValue: T, newValue: T): void {
    this.onChangeCallback(oldValue, newValue);
    this.baseAdapter.onChange(oldValue, newValue);
  }
}