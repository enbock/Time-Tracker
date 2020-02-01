import React from 'react';
import Style from '../../Style/Style';
import ApplicationModel from './Application/ApplicationModel';
import TopAppBar from './TopAppBar';

interface IProperties {
  model: ApplicationModel
}

interface IState {
}

export default class Application extends React.Component<IProperties, IState> {
  render(): React.ReactNode {
    const {model} = this.props;
    return <React.Fragment>
      <div className="mdc-typography">
        <Style source="Application" />
        <div className="content">
          <TopAppBar model={model.topAppBar} />
          <h3>
            A new decade ... a new start ... 😉<br /><br />
            Hello from {model.text}!
          </h3>
        </div>
      </div>
    </React.Fragment>;
  }
}