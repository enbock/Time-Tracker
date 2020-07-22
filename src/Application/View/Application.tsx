import React from 'react';
import ReactDOM from 'react-dom';
import Model from './Application/Model';
import Page from './Page';
import SideMenu, {Adapter as SideMenuAdapter} from './SideMenu';
import TopBar, {Adapter as TopBarAdapter} from './TopBar';

export interface Adapter extends TopBarAdapter, SideMenuAdapter {

}

export interface Properties {
  model: Model
  adapter: Adapter
}

export default class Application {
  adapter: Adapter;
  containerNode: Element | DocumentFragment | null;

  constructor(containerNode: Element | DocumentFragment | null, adapter: Adapter) {
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
