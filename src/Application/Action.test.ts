import {IObserver} from '../Observer/Observer';
import Action from './Action';

describe('Application.Action', () => {
  it('Open tab to github', () => {
    const action = new Action({
      value: false,
      adapter: {onChange: (oldValue, newValue) => {}}
    });

    window.open = jest.fn();
    action.adapter.onGithubClick();

    expect(window.open).toHaveBeenCalledWith('https://github.com/enbock/Time-Tracker/', '_blank');
  });

  it('Switch menu', () => {
    const menuOpenState: IObserver<boolean> = {
      value: false,
      adapter: {onChange: (oldValue, newValue) => {}}
    };
    const action = new Action(menuOpenState);

    action.adapter.onMenuClick();

    expect(menuOpenState.value).toBe(true);
  });

  it('Close menu', () => {
    const menuOpenState: IObserver<boolean> = {
      value: true,
      adapter: {onChange: (oldValue, newValue) => {}}
    };
    const action = new Action(menuOpenState);

    action.adapter.onClose();
    action.adapter.onClose();

    expect(menuOpenState.value).toBe(false);
  });
});