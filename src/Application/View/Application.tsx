import React from 'react';
import ReactDOM from 'react-dom';
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
        {model.styleSet.map(
          (path: string) => <link key={'stylePath_' + path} rel="stylesheet" href={path} />
        )}
        <TopBar model={model.topAppBar} adapter={adapter} />
        <SideMenu model={model.sideMenu} adapter={adapter} />
        <Page model={model.page} />
      </div>,
      this.containerNode
    );
  }
}
