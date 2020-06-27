import {IObserverAdapter} from '@enbock/state-value-observer/Observer';

export default class MenuOpenStateAdapter implements IObserverAdapter<boolean> {
  private currentState: boolean;

  constructor() {
    this.currentState = false;
  }

  onChange(newValue: boolean): void {
    this.currentState = newValue;
  }
}
