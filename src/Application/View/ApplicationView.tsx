import React from 'react';
import ApplicationModel from '../Model/ApplicationModel';

interface IProperties {
  model: ApplicationModel
}

interface IState {
}

export default class ApplicationView extends React.Component<IProperties, IState> {
  render(): React.ReactNode {
    const {model} = this.props;
    return (<h1>
      A new decade ... a new start ... 😉<br /><br />
      Hello from {model.text}!
    </h1>);
  }
}