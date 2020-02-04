import ApplicationAction from './ApplicationAction';

describe('Application.ApplicationAction', () => {
  it('Open tab to github', () => {
    const action = new ApplicationAction();
    const adapter = action.adapter;

    window.open = jest.fn();
    adapter.onGithubClick();

    expect(window.open).toHaveBeenCalledWith('https://github.com/enbock/Time-Tracker/', '_blank');
  })
});