import React from 'react';
import ReactDOM from 'react-dom';
import Style from '../../Theme/Style';
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

export default class Application {
  adapter: IAdapter;
  containerNode: Element | DocumentFragment | null;

  constructor(containerNode: Element | DocumentFragment | null, adapter: IAdapter) {
    this.containerNode = containerNode;
    this.adapter = adapter;
  }

  render(model: Model): void {
    const adapter = this.adapter;

    ReactDOM.render(
      <div className="mdc-typography">
        <Style source="material-components-web.min" />
        <Style source="material-components-web.icons" />
        <Style source={model.theme.source} external={model.theme.external} />
        <Style source="Theme/ThemePatch" />
        <Style source="Application" />
        <TopBar model={model.topAppBar} adapter={adapter} />
        <SideMenu model={model.sideMenu} adapter={adapter} />
        <Page model={model.page} />
      </div>,
      this.containerNode
    );
  }
}
