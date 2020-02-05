import {IObserver} from '../Observer/Observer';
import {IAdapter} from './View/Application';

export default class ApplicationAction {
  menuOpenState: IObserver<boolean>;

  constructor(menuOpenState: IObserver<boolean>) {
    this.menuOpenState = menuOpenState;
  }

  get adapter(): IAdapter {
    return {
      onGithubClick: this.openGithubWindow.bind(this),
      onMenuClick: this.switchMenuState.bind(this)
    };
  }

  protected openGithubWindow(): void {
    window.open('https://github.com/enbock/Time-Tracker/', '_blank');
  }

  protected switchMenuState(): void {
    this.menuOpenState.value = !this.menuOpenState.value;
  }
}
