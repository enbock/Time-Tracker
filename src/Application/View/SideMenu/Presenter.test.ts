import Translator from '../../../Language/Translator';
import {IObserver} from '../../../Observer/Observer';
import PageRegistry from '../../../Router/Registry';
import {IPageData} from '../../../Router/Router';
import Model from './Model';
import Presenter from './Presenter';

describe('Application.View.SideMenu.Presenter', () => {
  it('Present menu view data', () => {
    const menuObserver: IObserver<boolean> = {
      adapter: {onChange: jest.fn()},
      value: true
    };
    const translator: Translator = new Translator({});
    const activeTranslator: IObserver<Translator> = {
      value: translator,
      adapter: {onChange: jest.fn()}
    };
    const homePage: IPageData = {
      name: 'home',
      rootUrl: './home/',
      url: './home/',
      depth: 1
    };
    const settingsPage: IPageData = {
      name: 'settings',
      rootUrl: './settings/',
      url: './settings/',
      depth: 1
    };
    const routerObserver: IObserver<IPageData | null> = {
      value: settingsPage,
      adapter: {onChange: jest.fn()}
    };
    const pageRegistry: PageRegistry = new PageRegistry(routerObserver);
    const translatorSpy: jest.Mock = translator.translate = jest.fn();
    translatorSpy.mockReturnValueOnce('home');
    translatorSpy.mockReturnValueOnce('settings');
    pageRegistry.getPages = jest.fn().mockReturnValue(
      {
        home: homePage,
        settings: settingsPage
      }
    );

    const presenter = new Presenter(menuObserver, activeTranslator, routerObserver, pageRegistry);
    const model: Model = presenter.present();
    const expectedModel = new Model();
    expectedModel.isOpen = true;
    expectedModel.pageNames = ['home', 'settings'];
    expectedModel.translation = {
      home: 'home',
      settings: 'settings'
    };
    expectedModel.isActive = {
      home: false,
      settings: true
    };
    expectedModel.url = {
      home: './home/',
      settings: './settings/'
    };

    expect(translatorSpy).toBeCalledWith('Application.SideMenu.Home');
    expect(translatorSpy).toBeCalledWith('Application.SideMenu.Settings');
    expect(model).toEqual(expectedModel);
  });

  it('Present menu view data without active page', () => {
    const menuObserver: IObserver<boolean> = {
      adapter: {onChange: jest.fn()},
      value: true
    };
    const translator: Translator = new Translator({});
    const activeTranslator: IObserver<Translator> = {
      value: translator,
      adapter: {onChange: jest.fn()}
    };
    const homePage: IPageData = {
      name: 'home',
      rootUrl: './home/',
      url: './home/',
      depth: 1
    };
    const settingsPage: IPageData = {
      name: 'settings',
      rootUrl: './settings/',
      url: './settings/',
      depth: 1
    };
    const routerObserver: IObserver<IPageData | null> = {
      value: null,
      adapter: {onChange: jest.fn()}
    };
    const pageRegistry: PageRegistry = new PageRegistry(routerObserver);
    const translatorSpy: jest.Mock = translator.translate = jest.fn();
    translatorSpy.mockReturnValueOnce('home');
    translatorSpy.mockReturnValueOnce('settings');
    pageRegistry.getPages = jest.fn().mockReturnValue(
      {
        home: homePage,
        settings: settingsPage
      }
    );

    const presenter = new Presenter(menuObserver, activeTranslator, routerObserver, pageRegistry);
    const model: Model = presenter.present();
    const expectedModel = new Model();
    expectedModel.isOpen = true;
    expectedModel.pageNames = ['home', 'settings'];
    expectedModel.translation = {
      home: 'home',
      settings: 'settings'
    };
    expectedModel.isActive = {
      home: false,
      settings: false
    };
    expectedModel.url = {
      home: './home/',
      settings: './settings/'
    };

    expect(translatorSpy).toBeCalledWith('Application.SideMenu.Home');
    expect(translatorSpy).toBeCalledWith('Application.SideMenu.Settings');
    expect(model).toEqual(expectedModel);
  });
});
