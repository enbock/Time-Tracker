import React from 'react';
import {ILanguageSetup} from '../Language/ChangeLanguageSetup';
import Container from './Container';
import ApplicationView, {IAdapter} from './View/Application';
import Model from './View/Application/Model';

interface IProperties {
}

interface IState {
  loadedLanguage: string
}

export default class Application extends React.Component<IProperties, IState> {
  adapter: IAdapter;

  constructor(props: IProperties) {
    super(props);

    this.state = {
      loadedLanguage: ''
    };

    Container.language.setupAdapter.addListener(this.onLanguageLoaded.bind(this));
    this.adapter = Container.applicationAction.adapter;
  }

  componentDidMount(): void {
    Container.language.changeLanguageSetup.interact({languageCode: 'de-de'}, {}).then();
  }

  onLanguageLoaded(oldValue: ILanguageSetup, newValue: ILanguageSetup) {
    this.setState({loadedLanguage: newValue.languageCode})
  }

  render(): React.ReactNode {
    const model: Model = Container.applicationPresenter.present('Application');

    return <ApplicationView model={model} adapter={this.adapter} />
  }
}