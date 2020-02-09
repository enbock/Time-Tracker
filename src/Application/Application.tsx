import React from 'react';
import {ILanguageSetup} from '../Language/ChangeLanguageSetup';
import {IPageData} from '../Router/Router';
import Container from './Container';
import ModuleLoader from './ModuleLoader';
import ApplicationView, {IAdapter as IViewAdapter} from './View/Application';
import Model from './View/Application/Model';

interface IProperties {
}

interface IState {
  loadedLanguage: string,
  menuOpen: boolean,
  loadedPage: typeof React.Component | null,
  shownPage: string
}

export interface IModulePageData extends IPageData {
  module: string
}

export interface IAdapter extends IViewAdapter {
  onPageChanged(oldValue: IPageData, newValue: IPageData): void;
}

export default class Application extends React.Component<IProperties, IState> {
  adapter: IAdapter;
  moduleLoader: ModuleLoader;

  constructor(props: IProperties) {
    super(props);

    this.state = {
      loadedLanguage: Container.language.observer.value.languageCode,
      menuOpen: Container.menuOpenState.value,
      loadedPage: null,
      shownPage: ''
    };
    this.adapter = Container.applicationAction.adapter;
    this.moduleLoader = Container.moduleLoader;

    Container.language.adapter.addListener(this.onLanguageLoaded.bind(this));
    Container.moduleStateAdapter.addListener(this.onModuleLoaded.bind(this));
    Container.router.adapter.addListener(this.adapter.onPageChanged);
    Container.menuOpenStateAdapter.onChange = this.onMenuChange.bind(this);
  }

  componentDidMount(): void {
    Container.language.changeLanguageSetup.interact({languageCode: 'de-de'}, {}).then();
    const homePage: IModulePageData = {
      depth: 0,
      name: 'home',
      url: './',
      module: './HelloWorld'
    };
    const settingsPage: IModulePageData = {
      depth: 1,
      name: 'settings',
      url: './settings/',
      module: './Settings/Settings'
    };
    Container.router.registry.registerPage(homePage);
    Container.router.registry.registerPage(settingsPage);
    Container.router.observer.value = homePage;
  }

  onLanguageLoaded(oldValue: ILanguageSetup, newValue: ILanguageSetup) {
    this.setState({loadedLanguage: newValue.languageCode});
  }

  onMenuChange(oldValue: boolean, newValue: boolean) {
    this.setState({menuOpen: newValue});
  }

  onModuleLoaded(oldValue: typeof React.Component | null, newValue: typeof React.Component | null) {
    this.setState({loadedPage: newValue});
  }

  render(): React.ReactNode {
    const model: Model = Container.applicationPresenter.present();

    return <ApplicationView model={model} adapter={this.adapter} />;
  }
}