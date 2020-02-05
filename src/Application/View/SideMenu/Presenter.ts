import {IObserver} from '../../../Observer/Observer';
import Model from './Model';

export default class Presenter {
  menuOpenState: IObserver<boolean>;

  constructor(menuOpenState: IObserver<boolean>) {
    this.menuOpenState = menuOpenState;
  }

  present(): Model {
    const model = new Model();
    model.isOpen = this.menuOpenState.value;

    return model;
  }
}