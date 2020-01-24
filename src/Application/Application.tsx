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
    const model: ApplicationModel = Container.ModelFactory.createApplicationModel();
    model.text = 'Application, which wait for a presenter';

    return <ApplicationView model={model} />
  }
}