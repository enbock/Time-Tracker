import {ILanguageSetup} from '../../../Language/ChangeLanguageSetup';
import Translator from '../../../Language/Translator';
import {IObserver} from '../../../Observer/Observer';
import Page from '../Page';
import PageModel from '../Page/Model';
import PagePresenter from '../Page/Presenter';
import SideMenuModel from '../SideMenu/Model';
import SideMenuPresenter from '../SideMenu/Presenter';
import TopBarModel from '../TopBar/Model';
import TopBarPresenter from '../TopBar/Presenter';
import Model from './Model';
import Presenter from './Presenter';

describe('Application.Presenter.ApplicationPresenter', () => {
  let topBarPresenter: TopBarPresenter, topBarPresentSpy: jest.Mock;
  let sideMenuPresenter: SideMenuPresenter, sideMenuPresentSpy: jest.Mock;
  let pagePresenter: PagePresenter, pagePresentSpy: jest.Mock;
  let languageSetupObserver: IObserver<ILanguageSetup>;

  beforeEach(() => {
    languageSetupObserver = {
      value: {
        translator: new Translator({}),
        languageCode: ''
      },
      adapter: {onChange: (oldValue, newValue) => {}}
    };
    topBarPresenter = new TopBarPresenter(languageSetupObserver);
    sideMenuPresenter = new SideMenuPresenter(
      {
        value: true,
        adapter: {onChange: (oldValue, newValue) => {}}
      },
      languageSetupObserver
    );
    pagePresenter = new PagePresenter({
      value: null,
      adapter: {onChange: (oldValue, newValue) => {}}
    });

    topBarPresentSpy = topBarPresenter.present = jest.fn();
    sideMenuPresentSpy = sideMenuPresenter.present = jest.fn();
    pagePresentSpy = pagePresenter.present = jest.fn();
  });

  it('Present application data', () => {
    const translator: Translator = new Translator({});
    const presenter: Presenter = new Presenter(
      {
        value: {
          translator: translator,
          languageCode: ''
        },
        adapter: {onChange: (oldValue, newValue) => {}}
      },
      topBarPresenter,
      sideMenuPresenter,
      pagePresenter
    );
    const translateSpy: jest.Mock = translator.translate = jest.fn();
    const topBarModel: TopBarModel = new TopBarModel();
    topBarModel.title = 'top title';
    const sideMenuModel: SideMenuModel = new SideMenuModel();
    sideMenuModel.isOpen = true;
    const pageModel: PageModel = new PageModel();
    pageModel.module = Page;

    topBarPresentSpy.mockReturnValueOnce(topBarModel);
    sideMenuPresentSpy.mockReturnValueOnce(sideMenuModel);
    pagePresentSpy.mockReturnValueOnce(pageModel);

    const expectedModel: Model = new Model();
    expectedModel.topAppBar = topBarModel;
    expectedModel.sideMenu = sideMenuModel;
    expectedModel.page = pageModel;

    const result = presenter.present();
    expect(result).toEqual(expectedModel);
  });
});