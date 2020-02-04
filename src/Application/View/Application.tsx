import React from 'react';
import Style from '../../Style/Style';
import Model from './Application/Model';
import TopBar, {IAdapter as ITopBarAdapter} from './TopBar';

export interface IAdapter extends ITopBarAdapter {

}

export interface IProperties {
  model: Model
  adapter: IAdapter
}

interface IState {
}

export default class Application extends React.Component<IProperties, IState> {
  render(): React.ReactNode {
    const {model, adapter} = this.props;

    return (<div className="mdc-typography">
      <Style source="Application" />
      <div className="content">
        <TopBar model={model.topAppBar} adapter={adapter} />
        <h3>
          A new decade ... a new start ... 😉<br /><br />
          Hello from {model.text}!
        </h3>
      </div>
    </div>);
  }
}