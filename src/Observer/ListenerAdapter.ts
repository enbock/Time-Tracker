import {IObserverAdapter, IOnChangeCallback} from './Observer';

export default class ListenerAdapter<T> implements IObserverAdapter<T> {
  protected listeners: IOnChangeCallback<T>[];

  constructor() {
    this.listeners = [];
  }

  public onChange(newValue: T) {
    function callListener(listener: IOnChangeCallback<T>): void {
      setTimeout(function handler(): void {
        listener(newValue);
      }, 1);
    }

    this.listeners.forEach(callListener);
  }

  public addListener(callback: IOnChangeCallback<T>) {
    this.removeListener(callback);
    this.listeners.push(callback);
  }

  public removeListener(callback: IOnChangeCallback<T>) {
    const index: number = this.listeners.indexOf(callback);
    if (index < 0) return;
    this.listeners.splice(index, 1);
  }
}