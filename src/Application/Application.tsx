import React from 'react';
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
      loadedLanguage: Container.language.observer.value,
      menuOpen: Container.menuOpenState.value,
      loadedPage: null,
      shownPage: ''
    };
    this.adapter = Container.applicationActionAdapter;
    this.moduleLoader = Container.moduleLoader;

    Container.language.adapter.addListener(this.onLanguageLoaded.bind(this));
    Container.moduleStateAdapter.addListener(this.onModuleLoaded.bind(this));
    Container.menuOpenStateAdapter.onChange = this.onMenuChange.bind(this);
  }

  componentDidMount(): void {
  }

  onLanguageLoaded(oldValue: string, newValue: string) {
    this.setState({loadedLanguage: newValue});
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