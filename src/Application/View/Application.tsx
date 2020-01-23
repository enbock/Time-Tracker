import React from 'react';
import ApplicationView from './Model/ApplicationView';

export interface Properties {
  view: ApplicationView
}

export default class Application extends React.Component<Properties> {

  render(): JSX.Element {
    const {view} = this.props;
    return (
      <h1>
        A new decade ... a new start ... 😉<br /><br />
        Hello from {view.compiler} and {view.framework}!
      </h1>
    );
  }
}