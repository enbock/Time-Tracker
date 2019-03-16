/** global: jest */
import Manager from '../Manager';
import ChangeInteractor from './Change';
import ChangeRequest from './Change/Request';
import ChangeResponse from './Change/Response';

describe('Language Change Interactor', function testChangeInteractor() {
  it('Set new language', function testSetALanguage() {
    const manager = new Manager('de_DE');
    manager.change = jest.fn();

    const request = new ChangeRequest('new'),
      response = new ChangeResponse();

    const interactor = new ChangeInteractor(manager);
    interactor.interact(request, response);

    expect(manager.change).toHaveBeenCalledWith('new');
    expect(response.isChanged).toBe(true);
  });

  it('Ignore double set', function testSetLanguageAgain() {
    const manager = new Manager('new');
    manager.change = jest.fn();

    const request = new ChangeRequest('new'),
      response = new ChangeResponse();

    const interactor = new ChangeInteractor(manager);
    interactor.interact(request, response);

    expect(manager.change).not.toHaveBeenCalled();
    expect(response.isChanged).toBe(false);
  });
});
