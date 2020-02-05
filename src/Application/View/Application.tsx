import React from 'react';
import Style from '../../Style/Style';
import Model from './Application/Model';
import SideMenu from './SideMenu';
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

    return <div className="mdc-typography">
      <Style source="Application" />
      <TopBar model={model.topAppBar} adapter={adapter} />
      <SideMenu model={model.sideMenu} />
      <div className="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">
        <main className="main-content" id="main-content">
          <h3>
            A new decade ... a new start ... 😉<br /><br />
            Hello from {model.text}!
          </h3>
        </main>
      </div>
    </div>;
  }
}