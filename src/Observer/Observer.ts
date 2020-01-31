export interface IOnChangeCallback<T> {
  (oldValue: T, newValue: T): void;
}

export interface IObserverAdapter<T> {
  onChange: IOnChangeCallback<T>
}

export interface IObserver<T> {
  value: T
}

export default class Observer<T> implements IObserver<T> {
  protected current: T;
  protected adapter: IObserverAdapter<T>;

  constructor(initialValue: T, adapter: IObserverAdapter<T>) {
    this.current = initialValue;
    this.adapter = adapter;
  }

  public get value(): T {
    return this.current;
  }

  public set value(newValue: T) {
    const oldValue: T = this.value;
    this.current = newValue;
    this.adapter.onChange(oldValue, newValue);
  }
}