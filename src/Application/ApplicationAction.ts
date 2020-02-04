import {IAdapter} from './View/Application';

export default class ApplicationAction {
  get adapter(): IAdapter {
    return {
      onGithubClick: this.openGithubWindow.bind(this)
    }
  }

  protected openGithubWindow(): void {
    window.open('https://github.com/enbock/Time-Tracker/', '_blank');
  }
}
