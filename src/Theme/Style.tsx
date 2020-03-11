import React from 'react';

interface IProperties {
  source: string,
  external?: boolean
}

interface IState {
}

export default class Style extends React.Component<IProperties, IState> {
  render() {
    const source: string = this.props.external ? this.props.source : './Style/' + this.props.source + '.css';
    return <link rel="stylesheet" href={source} />;
  }
}