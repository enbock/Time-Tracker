import React from 'react';

interface Properties {
  source: string,
  external?: boolean
}

interface State {
}

export default class Style extends React.Component<Properties, State> {
  render() {
    const source: string = this.props.external ? this.props.source : './Style/' + this.props.source + '.css';
    return <link rel="stylesheet" href={source} />;
  }
}
