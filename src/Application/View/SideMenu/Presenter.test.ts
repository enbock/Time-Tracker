import Observer from '../../../Observer/Observer';
import Model from './Model';
import Presenter from './Presenter';

describe('Application.View.SideMenu.Presenter', () => {
  it('Present menu view data', () => {
    const observer: Observer<boolean> = new Observer<boolean>(true, {onChange: (oldValue, newValue) => {}});
    const expectedModel = new Model();
    expectedModel.isOpen = true;

    const presenter = new Presenter(observer);
    const model = presenter.present();

    expect(model).toEqual(expectedModel);
  });
});