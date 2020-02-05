import Translator from '../../../Language/Translator';
import SideMenuModel from '../SideMenu/Model';
import SideMenuPresenter from '../SideMenu/Presenter';
import TopBarModel from '../TopBar/Model';
import TopBarPresenter from '../TopBar/Presenter';
import Model from './Model';
import Presenter from './Presenter';

describe('Application.Presenter.ApplicationPresenter', () => {
  let topBarPresenter: TopBarPresenter, topBarPresentSpy: jest.Mock;
  let sideMenuPresenter: SideMenuPresenter, sideMenuPresentSpy: jest.Mock;

  beforeEach(() => {
    topBarPresenter = new TopBarPresenter({
      value: {
        translator: new Translator({}),
        languageCode: ''
      }
    });
    sideMenuPresenter = new SideMenuPresenter({value: true});

    topBarPresentSpy = topBarPresenter.present = jest.fn();
    sideMenuPresentSpy = sideMenuPresenter.present = jest.fn();
  });

  it('Present application data', () => {
    const translator: Translator = new Translator({});
    const presenter: Presenter = new Presenter({
      value: {
        translator: translator,
        languageCode: ''
      }
    }, topBarPresenter, sideMenuPresenter);
    const translateSpy: jest.Mock = translator.translate = jest.fn();
    const topBarModel: TopBarModel = new TopBarModel();
    topBarModel.title = 'top title';
    const sideMenuModel: SideMenuModel = new SideMenuModel();
    sideMenuModel.isOpen = true;

    translateSpy.mockReturnValueOnce('translated text');
    topBarPresentSpy.mockReturnValueOnce(topBarModel);
    sideMenuPresentSpy.mockReturnValueOnce(sideMenuModel);

    const expectedModel: Model = new Model();
    expectedModel.text = 'test translated text';
    expectedModel.topAppBar = topBarModel;
    expectedModel.sideMenu = sideMenuModel;

    const result = presenter.present('test ');
    expect(translateSpy).toHaveBeenCalledWith('Application.Test');
    expect(result).toEqual(expectedModel);
  });
});