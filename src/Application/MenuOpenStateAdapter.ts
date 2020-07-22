import {ObserverAdapter} from '@enbock/state-value-observer/ValueObserver';

export default class MenuOpenStateAdapter implements ObserverAdapter<boolean> {
  private currentState: boolean;

  constructor() {
    this.currentState = false;
  }

  onChange(newValue: boolean): void {
    this.currentState = newValue;
  }
}
