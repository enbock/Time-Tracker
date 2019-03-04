/** global: jest */
import ChangeInteractor from './Change';
import ChangeRequest from './Change/Request';
import ChangeResponse from './Change/Response';

describe('Themes Change Interactor', function testChangeInteractor() {
  it('Set new theme', function testSetANewTheme() {
    const manager = {
      get activeTheme() {
        return manager.changeTheme.mock.calls.length === 0 ? 'old' : 'new';
      },
      changeTheme: jest.fn(),
      themeFile: 'file'
    };

    const request  = new ChangeRequest('new'),
          response = new ChangeResponse();

    const interactor = new ChangeInteractor(manager);
    interactor.interact(request, response);

    expect(manager.changeTheme).toHaveBeenCalledWith('new');
    expect(response.isChanged).toBe(true);
    expect(response.theme).toBe('new');
    expect(response.file).toBe('file');
  });

  it('Ignore double set', function testSetANewTheme() {
    const manager = {
      activeTheme: 'new',
      changeTheme: jest.fn(),
      themeFile: 'file'
    };

    const request  = new ChangeRequest('new'),
          response = new ChangeResponse();

    const interactor = new ChangeInteractor(manager);
    interactor.interact(request, response);

    expect(manager.changeTheme).not.toHaveBeenCalled();
    expect(response.isChanged).toBe(false);
    expect(response.theme).toBe('new');
    expect(response.file).toBe('file');
  });
});
