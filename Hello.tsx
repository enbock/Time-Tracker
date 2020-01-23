import * as React from 'react';

export interface PropsType {
  compiler: string;
  framework: string;
}

export default class Hello extends React.Component<PropsType, {}> {
  render() {
    return (
      <h1>
        A new decade ... a new start ... 😉<br /><br />
        Hello from {this.props.compiler} and {this.props.framework}!
      </h1>
    );
  }
}