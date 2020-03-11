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
import ThemeModel from './ThemeModel';
import ThemePresenter from './ThemePresenter';

describe('Application.Presenter.ApplicationPresenter', () => {
  let topBarPresenter: TopBarPresenter, topBarPresentSpy: jest.Mock;
  let sideMenuPresenter: SideMenuPresenter, sideMenuPresentSpy: jest.Mock;
  let pagePresenter: PagePresenter, pagePresentSpy: jest.Mock;
  let themePresenter: ThemePresenter, themePresentSpy: jest.Mock;
  let translatorObserver: IObserver<Translator>;
  let translator: Translator;

  beforeEach(() => {
    translator = {} as Translator;
    translatorObserver = {value: translator} as IObserver<Translator>;
    topBarPresenter = {} as TopBarPresenter;
    themePresenter = {} as ThemePresenter;
    sideMenuPresenter = {} as SideMenuPresenter;
    pagePresenter = {} as PagePresenter;

    topBarPresentSpy = topBarPresenter.present = jest.fn();
    sideMenuPresentSpy = sideMenuPresenter.present = jest.fn();
    pagePresentSpy = pagePresenter.present = jest.fn();
    themePresentSpy = themePresenter.present = jest.fn();
  });

  it('Present application data', () => {
    const presenter: Presenter = new Presenter(
      translatorObserver,
      topBarPresenter,
      sideMenuPresenter,
      pagePresenter,
      themePresenter
    );
    const translateSpy: jest.Mock = translator.translate = jest.fn();
    const topBarModel: TopBarModel = new TopBarModel();
    topBarModel.title = 'top title';
    const sideMenuModel: SideMenuModel = new SideMenuModel();
    sideMenuModel.isOpen = true;
    const pageModel: PageModel = new PageModel();
    pageModel.module = Page;
    const themeModel: ThemeModel = new ThemeModel();
    themeModel.source = 'theme';

    topBarPresentSpy.mockReturnValueOnce(topBarModel);
    sideMenuPresentSpy.mockReturnValueOnce(sideMenuModel);
    pagePresentSpy.mockReturnValueOnce(pageModel);
    themePresentSpy.mockReturnValueOnce(themeModel);

    const expectedModel: Model = new Model();
    expectedModel.topAppBar = topBarModel;
    expectedModel.sideMenu = sideMenuModel;
    expectedModel.page = pageModel;
    expectedModel.theme = themeModel;

    const result = presenter.present();
    expect(result).toEqual(expectedModel);
  });
});