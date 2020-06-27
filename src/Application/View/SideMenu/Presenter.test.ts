import PageRegistry from '@enbock/application-router/Registry';
import {IPageData} from '@enbock/application-router/Router';
import {IObserver} from '@enbock/state-value-observer/Observer';
import Translator from '../../../Language/Translator';
import Model from './Model';
import Presenter from './Presenter';

describe('Application.View.SideMenu.Presenter', () => {
  it('Present menu view data', () => {
    const menuObserver: IObserver<boolean> = {
      value: true
    };
    const translator: Translator = new Translator({});
    const activeTranslator: IObserver<Translator> = {
      value: translator
    };
    const homePage: IPageData = {
      name: 'home',
      baseUrl: './home/',
      currentUrl: './home/'
    };
    const settingsPage: IPageData = {
      name: 'settings',
      baseUrl: './settings/',
      currentUrl: './settings/'
    };
    const routerObserver: IObserver<IPageData | null> = {
      value: settingsPage
    };
    const pageRegistry: PageRegistry = new PageRegistry(routerObserver);
    const translatorSpy: jest.Mock = translator.translate = jest.fn();
    translatorSpy.mockReturnValueOnce('home');
    translatorSpy.mockReturnValueOnce('settings');
    pageRegistry.getPages = jest.fn().mockReturnValue([homePage, settingsPage]);

    const presenter: Presenter = new Presenter(menuObserver, activeTranslator, routerObserver, pageRegistry);
    const model: Model = presenter.present();
    const expectedModel: Model = new Model();
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
      value: true
    };
    const translator: Translator = new Translator({});
    const activeTranslator: IObserver<Translator> = {
      value: translator
    };
    const homePage: IPageData = {
      name: 'home',
      baseUrl: './home/',
      currentUrl: './home/'
    };
    const settingsPage: IPageData = {
      name: 'settings',
      baseUrl: './settings/',
      currentUrl: './settings/'
    };
    const routerObserver: IObserver<IPageData | null> = {
      value: null
    };
    const pageRegistry: PageRegistry = new PageRegistry(routerObserver);
    const translatorSpy: jest.Mock = translator.translate = jest.fn();
    translatorSpy.mockReturnValueOnce('home');
    translatorSpy.mockReturnValueOnce('settings');
    pageRegistry.getPages = jest.fn().mockReturnValue([homePage, settingsPage]);

    const presenter: Presenter = new Presenter(menuObserver, activeTranslator, routerObserver, pageRegistry);
    const model: Model = presenter.present();
    const expectedModel: Model = new Model();
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
