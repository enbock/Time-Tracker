import * as mdc from 'material-components-web';
import React from 'react';
import ReactDOM from 'react-dom';
import Model, {MenuDictionary} from './SideMenu/Model';

export interface Adapter {
  onClose(): void
  onMenu(name: string): void
}

export interface Properties {
  model: Model,
  adapter: Adapter
}

interface State {
}

export default class SideMenu extends React.Component<Properties, State> {
  drawer: mdc.drawer.MDCDrawer | any | undefined;

  componentDidMount(): void {
    // @ts-ignore
    this.drawer = new mdc.drawer.MDCDrawer(ReactDOM.findDOMNode(this));
    this.drawer.listen('MDCDrawer:closed', this.props.adapter.onClose);
  }

  onMenuClick(event: React.MouseEvent<HTMLAnchorElement>, name: string) {
    event.stopPropagation();
    event.preventDefault();
    this.props.adapter.onMenu(name);
  }

  render(): React.ReactElement {
    const model: Model = this.props.model;
    this.drawer && (this.drawer.open = model.isOpen);

    const translation: MenuDictionary<string> = model.translation;
    const isActive: MenuDictionary<boolean> = model.isActive;
    const url: MenuDictionary<string> = model.url;

    const menuEntries: React.ReactElement[] = model.pageNames.map(
      (name: string, index: number): React.ReactElement => {
        return <a
          key={'menuEntry:' + name}
          className={'mdc-list-item' + (isActive[name] ? ' mdc-list-item--activated' : '')}
          href={url[name]}
          aria-selected={isActive[name] ? 'true' : 'false'}
          data-testid={name}
          tabIndex={index}

          onClick={(event: React.MouseEvent<HTMLAnchorElement>) => this.onMenuClick(event, name)}
        >
          <i className="material-icons mdc-list-item__graphic" aria-hidden="true">{name}</i>
          <span className="mdc-list-item__text">{translation[name]}</span>
        </a>;
      }
    );

    return <React.Fragment>
      <aside className="mdc-drawer mdc-drawer--modal mdc-top-app-bar--fixed-adjust">
        <div className="mdc-drawer__content">
          <nav className="mdc-list">
            {menuEntries}
          </nav>
        </div>
      </aside>
      <div className="mdc-drawer-scrim" />
    </React.Fragment>;
  }
}
