import React from 'react';

interface IProperties {

}

interface IState {

}

export default class Settings extends React.Component<IProperties, IState> {
  render(): React.ReactElement {
    return <h3>
      This become the settings page 😉<br /><br />
      Hello from <code>Settings/Settings.tsx</code>!
    </h3>;
  }
}