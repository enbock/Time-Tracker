import PageRegistry from '@enbock/application-router/Registry';
import {PageData} from '@enbock/application-router/Router';
import {Observer} from '@enbock/state-value-observer/ValueObserver';
import Translator from '../../../Language/Translator';
import Model from './Model';
import Presenter from './Presenter';

describe('Application.View.SideMenu.Presenter', () => {
  it('Present menu view data', () => {
    const menuObserver: Observer<boolean> = {
      value: true
    };
    const translator: Translator = new Translator({});
    const activeTranslator: Observer<Translator> = {
      value: translator
    };
    const homePage: PageData = {
      name: 'home',
      baseUrl: './home/',
      currentUrl: './home/'
    };
    const settingsPage: PageData = {
      name: 'settings',
      baseUrl: './settings/',
      currentUrl: './settings/'
    };
    const routerObserver: Observer<PageData | null> = {
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
    const menuObserver: Observer<boolean> = {
      value: true
    };
    const translator: Translator = new Translator({});
    const activeTranslator: Observer<Translator> = {
      value: translator
    };
    const homePage: PageData = {
      name: 'home',
      baseUrl: './home/',
      currentUrl: './home/'
    };
    const settingsPage: PageData = {
      name: 'settings',
      baseUrl: './settings/',
      currentUrl: './settings/'
    };
    const routerObserver: Observer<PageData | null> = {
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
