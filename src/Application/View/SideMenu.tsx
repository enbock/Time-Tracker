import * as mdc from 'material-components-web';
import React from 'react';
import ReactDOM from 'react-dom';
import Model from './SideMenu/Model';

export interface IAdapter {
  onClose(): void
}

export interface IProperties {
  model: Model,
  adapter: IAdapter
}

interface IState {
}

export default class SideMenu extends React.Component<IProperties, IState> {
  drawer: mdc.drawer.MDCDrawer | undefined;

  componentDidMount(): void {
    // @ts-ignore
    this.drawer = new mdc.drawer.MDCDrawer(ReactDOM.findDOMNode(this));
    // @ts-ignore
    this.drawer.listen('MDCDrawer:closed', this.props.adapter.onClose);
  }

  render(): React.ReactElement {
    this.drawer &&
    (
      this.drawer.open = this.props.model.isOpen
    );
    return <React.Fragment>
      <aside className="mdc-drawer mdc-drawer--modal mdc-top-app-bar--fixed-adjust">
        <div className="mdc-drawer__content">
          <nav className="mdc-list">
            <a className="mdc-list-item mdc-list-item--activated" href="#" aria-current="page">
              <i className="material-icons mdc-list-item__graphic" aria-hidden="true">inbox</i>
              <span className="mdc-list-item__text">Inbox</span>
            </a>
            <a className="mdc-list-item" href="#">
              <i className="material-icons mdc-list-item__graphic" aria-hidden="true">send</i>
              <span className="mdc-list-item__text">Outgoing</span>
            </a>
            <a className="mdc-list-item" href="#">
              <i className="material-icons mdc-list-item__graphic" aria-hidden="true">drafts</i>
              <span className="mdc-list-item__text">Drafts</span>
            </a>
          </nav>
        </div>
      </aside>
      <div className="mdc-drawer-scrim" />
    </React.Fragment>;
  }
}