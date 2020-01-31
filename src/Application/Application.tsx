import React from 'react';
import Container from './Container';
import ApplicationModel from './Model/ApplicationModel';
import ApplicationView from './View/ApplicationView';

interface IProperties {
}

interface IState {
}

export default class Application extends React.Component<IProperties, IState> {
  public render() {
    const model: ApplicationModel = Container.applicationPresenter.present('Application');

    return <ApplicationView model={model} />
  }
}