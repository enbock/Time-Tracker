import React from 'react';

interface IProperties {

}

interface IState {

}

export default class HelloWorld extends React.Component<IProperties, IState> {
  render(): React.ReactElement {
    return <h3>
      A new decade ... a new start ... 😉<br /><br />
      Hello from <code>HelloWorld.tsx</code>!
    </h3>;
  }
}