import {Observer} from '@enbock/state-value-observer/ValueObserver';
import {Theme} from '../../../Theme/ThemesRegistry';
import Page from '../Page';
import PageModel from '../Page/Model';
import PagePresenter from '../Page/Presenter';
import SideMenuModel from '../SideMenu/Model';
import SideMenuPresenter from '../SideMenu/Presenter';
import TopBarModel from '../TopBar/Model';
import TopBarPresenter from '../TopBar/Presenter';
import Model from './Model';
import Presenter from './Presenter';
import StyleUrlFormatter from './StyleUrlFormatter';

describe('Application.Presenter.ApplicationPresenter', () => {
  let topBarPresenter: TopBarPresenter, topBarPresentSpy: jest.Mock;
  let sideMenuPresenter: SideMenuPresenter, sideMenuPresentSpy: jest.Mock;
  let pagePresenter: PagePresenter, pagePresentSpy: jest.Mock;
  let styleUrlFormatter: StyleUrlFormatter, themePresentSpy: jest.Mock;
  let themeObserver: Observer<Theme>;
  let theme: Theme;

  beforeEach(() => {
    theme = {} as Theme;
    themeObserver = {value: theme} as Observer<Theme>;
    topBarPresenter = {} as TopBarPresenter;
    styleUrlFormatter = jest.genMockFromModule<StyleUrlFormatter>('./StyleUrlFormatter');
    styleUrlFormatter.format = jest.fn();
    sideMenuPresenter = {} as SideMenuPresenter;
    pagePresenter = {} as PagePresenter;

    topBarPresentSpy = topBarPresenter.present = jest.fn();
    sideMenuPresentSpy = sideMenuPresenter.present = jest.fn();
    pagePresentSpy = pagePresenter.present = jest.fn();
  });

  it('Present application data with theme change', () => {
    theme.isBuildIn = true;
    theme.url = 'theme';
    const presenter: Presenter = new Presenter(
      themeObserver,
      topBarPresenter,
      sideMenuPresenter,
      pagePresenter,
      styleUrlFormatter
    );
    const topBarModel: TopBarModel = new TopBarModel();
    topBarModel.title = 'top title';
    const sideMenuModel: SideMenuModel = new SideMenuModel();
    sideMenuModel.isOpen = true;
    const pageModel: PageModel = new PageModel();
    pageModel.module = Page;

    topBarPresentSpy.mockReturnValue(topBarModel);
    sideMenuPresentSpy.mockReturnValue(sideMenuModel);
    pagePresentSpy.mockReturnValue(pageModel);
    (styleUrlFormatter.format as jest.Mock)
      .mockReturnValueOnce('material.css')
      .mockReturnValueOnce('icons.css')
      .mockReturnValueOnce('application.css')
      .mockReturnValueOnce('theme.css')
      .mockReturnValueOnce('patch.css')
      .mockReturnValueOnce('patch2.css')
    ;

    const expectedModel: Model = new Model();
    expectedModel.topAppBar = topBarModel;
    expectedModel.sideMenu = sideMenuModel;
    expectedModel.page = pageModel;
    expectedModel.styleSet = [
      'material.css',
      'icons.css',
      'application.css',
      'theme.css',
      'patch.css'
    ];

    const result: Model = presenter.present();
    expect(result).toEqual(expectedModel);
    expect(styleUrlFormatter.format).toBeCalledWith('material-components-web.min');
    expect(styleUrlFormatter.format).toBeCalledWith('material-components-web.icons');
    expect(styleUrlFormatter.format).toBeCalledWith('Application');
    expect(styleUrlFormatter.format).toBeCalledWith('theme');
    expect(styleUrlFormatter.format).toBeCalledWith('Theme/ThemePatch');

    theme.isBuildIn = false;
    theme.name = 'other';
    theme.url = 'http://world.css';

    expectedModel.styleSet = [
      'material.css',
      'icons.css',
      'application.css',
      'http://world.css',
      'patch2.css'
    ];
    const updateResult: Model = presenter.present();
    expect(updateResult).toEqual(expectedModel);
  });

  it('Present application data without theme change', () => {
    theme.isBuildIn = true;
    theme.url = 'theme';
    const presenter: Presenter = new Presenter(
      themeObserver,
      topBarPresenter,
      sideMenuPresenter,
      pagePresenter,
      styleUrlFormatter
    );
    const topBarModel: TopBarModel = new TopBarModel();
    topBarModel.title = 'top title';
    const sideMenuModel: SideMenuModel = new SideMenuModel();
    sideMenuModel.isOpen = true;
    const pageModel: PageModel = new PageModel();
    pageModel.module = Page;

    topBarPresentSpy.mockReturnValue(topBarModel);
    sideMenuPresentSpy.mockReturnValue(sideMenuModel);
    pagePresentSpy.mockReturnValue(pageModel);
    (styleUrlFormatter.format as jest.Mock)
      .mockReturnValueOnce('material.css')
      .mockReturnValueOnce('icons.css')
      .mockReturnValueOnce('application.css')
      .mockReturnValueOnce('theme.css')
      .mockReturnValueOnce('patch.css')
      .mockReturnValueOnce('patch2.css')
    ;

    const expectedModel: Model = new Model();
    expectedModel.topAppBar = topBarModel;
    expectedModel.sideMenu = sideMenuModel;
    expectedModel.page = pageModel;
    expectedModel.styleSet = [
      'material.css',
      'icons.css',
      'application.css',
      'theme.css',
      'patch.css'
    ];

    const result: Model = presenter.present();
    expect(result).toEqual(expectedModel);
    expect(styleUrlFormatter.format).toBeCalledWith('material-components-web.min');
    expect(styleUrlFormatter.format).toBeCalledWith('material-components-web.icons');
    expect(styleUrlFormatter.format).toBeCalledWith('Application');
    expect(styleUrlFormatter.format).toBeCalledWith('theme');
    expect(styleUrlFormatter.format).toBeCalledWith('Theme/ThemePatch');

    const updateResult: Model = presenter.present();
    expect(updateResult).toEqual(expectedModel);
  });
});
