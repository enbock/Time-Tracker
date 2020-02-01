import React from 'react';
import {ILanguageSetup} from '../Language/ChangeLanguageSetup';
import Container from './Container';
import ApplicationView from './View/Application';
import ApplicationModel from './View/Application/ApplicationModel';

interface IProperties {
}

interface IState {
  loadedLanguage: string
}

export default class Application extends React.Component<IProperties, IState> {
  constructor(props: IProperties) {
    super(props);

    this.state = {
      loadedLanguage: ''
    };

    Container.language.setupAdapter.addListener(this.onLanguageLoaded.bind(this));
  }

  componentDidMount(): void {
    Container.language.changeLanguageSetup.interact({languageCode: 'de-de'}, {}).then();
  }

  onLanguageLoaded(oldValue: ILanguageSetup, newValue: ILanguageSetup) {
    this.setState({loadedLanguage: newValue.languageCode})
  }

  render(): React.ReactNode {
    const model: ApplicationModel = Container.applicationPresenter.present('Application');

    return <ApplicationView model={model} />
  }
}