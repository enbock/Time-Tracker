import * as mdc from 'material-components-web';
import React from 'react';
import ReactDOM from 'react-dom';
import Model, {IPages} from './SideMenu/Model';

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
    const model = this.props.model;
    this.drawer && (this.drawer.open = model.isOpen);

    const translation: IPages<string> = model.translation;

    return <React.Fragment>
      <aside className="mdc-drawer mdc-drawer--modal mdc-top-app-bar--fixed-adjust">
        <div className="mdc-drawer__content">
          <nav className="mdc-list">
            <a
              className="mdc-list-item mdc-list-item--activated"
              href={model.url.home}
              aria-selected={model.isActive.home ? 'true' : 'false'}
            >
              <i className="material-icons mdc-list-item__graphic" aria-hidden="true">home</i>
              <span className="mdc-list-item__text">{translation.home}</span>
            </a>
            <a
              className="mdc-list-item"
              href={model.url.settings}
              aria-selected={model.isActive.settings ? 'true' : 'false'}
            >
              <i className="material-icons mdc-list-item__graphic" aria-hidden="true">settings</i>
              <span className="mdc-list-item__text">{translation.settings}</span>
            </a>
          </nav>
        </div>
      </aside>
      <div className="mdc-drawer-scrim" />
    </React.Fragment>;
  }
}