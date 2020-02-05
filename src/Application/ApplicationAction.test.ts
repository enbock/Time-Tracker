import ApplicationAction from './ApplicationAction';

describe('Application.ApplicationAction', () => {
  it('Open tab to github', () => {
    const action = new ApplicationAction({value: false});

    window.open = jest.fn();
    action.adapter.onGithubClick();

    expect(window.open).toHaveBeenCalledWith('https://github.com/enbock/Time-Tracker/', '_blank');
  });

  it('Switch menu', () => {
    const menuOpenState = {value: false};
    const action = new ApplicationAction(menuOpenState);

    action.adapter.onMenuClick();

    expect(menuOpenState.value).toBe(true);
  });
});