import React from 'react';
import Container from './Application/Container';
import ApplicationView, {IAdapter} from './Application/View/Application';
import Model from './Application/View/Application/Model';
import {ILanguageSetup} from './Language/ChangeLanguageSetup';

interface IProperties {
}

interface IState {
  loadedLanguage: string,
  menuOpen: boolean,
  loadedPage: typeof React.Component | null
}

export default class Application extends React.Component<IProperties, IState> {
  adapter: IAdapter;

  constructor(props: IProperties) {
    super(props);

    this.state = {
      loadedLanguage: Container.language.setupObserver.value.languageCode,
      menuOpen: Container.menuOpenState.value,
      loadedPage: null
    };

    Container.language.setupAdapter.addListener(this.onLanguageLoaded.bind(this));
    Container.moduleStateAdapter.addListener(this.onModuleLoaded.bind(this));
    Container.menuOpenStateAdapter.onChange = this.onMenuChange.bind(this);
    this.adapter = Container.applicationAction.adapter;
  }

  componentDidMount(): void {
    Container.language.changeLanguageSetup.interact({languageCode: 'de-de'}, {}).then();
    Container.moduleNameState.value = 'HelloWorld';
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