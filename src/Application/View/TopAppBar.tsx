import * as mdc from 'material-components-web';
import React from 'react';
import ReactDOM from 'react-dom';
import TopAppBarModel from './TopAppBar/TopAppBarModel'

interface IProperties {
  model: TopAppBarModel
}

interface IState {
}

export default class TopAppBar extends React.Component<IProperties, IState> {
  topAppBar: mdc.topAppBar.MDCTopAppBar | undefined;

  constructor(props: IProperties) {
    super(props);
  }

  componentDidMount(): void {
    const topAppBarElement = ReactDOM.findDOMNode(this);
    // @ts-ignore
    this.topAppBar = new mdc.topAppBar.MDCTopAppBar(topAppBarElement);
  }

  render(): React.ReactElement {
    const model: TopAppBarModel = this.props.model;
    return <React.Fragment>
      <header className="mdc-top-app-bar mdc-top-app-bar--fixed">
        <div className="mdc-top-app-bar__row">
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <button className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">menu</button>
            <span className="mdc-top-app-bar__title">{model.title}</span>
          </section>
        </div>
      </header>
      <div className="mdc-top-app-bar__row" />
    </React.Fragment>;
  }
}