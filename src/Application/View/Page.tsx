import React from 'react';
import Model from './Page/Model';

interface Properties {
  model: Model
}

interface State {

}

export default class Page extends React.Component<Properties, State> {
  render(): React.ReactElement {
    return <div className="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">
      <main className="main-content" id="main-content">
        {this.props.model.module != null ? <this.props.model.module /> : <div>Loading...</div>}
      </main>
    </div>;
  }
}
