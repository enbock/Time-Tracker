import React from 'react';

interface IProperties {
  source: string
}

interface IState {
}

export default class Style extends React.Component<IProperties, IState> {
  render() {
    return <link rel="stylesheet" href={'./Style/' + this.props.source + '.css'} />;
  }
}