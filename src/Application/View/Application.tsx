import React from 'react';
import Style from '../../Style/Style';
import Model from './Application/Model';
import Page from './Page';
import SideMenu, {IAdapter as ISideMenuAdapter} from './SideMenu';
import TopBar, {IAdapter as ITopBarAdapter} from './TopBar';

export interface IAdapter extends ITopBarAdapter, ISideMenuAdapter {

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
      <Style source="material-components-web.min" />
      <Style source="material-components-web.icons" />
      <Style source="Application" />
      <TopBar model={model.topAppBar} adapter={adapter} />
      <SideMenu model={model.sideMenu} adapter={adapter} />
      <Page model={model.page} />
    </div>;
  }
}