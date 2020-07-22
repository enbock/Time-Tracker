import React from 'react';

interface Properties {

}

interface State {

}

export default class HelloWorld extends React.Component<Properties, State> {
  render(): React.ReactElement {
    return <h3>
      A new decade ... a new start ... 😉<br /><br />
      Hello from <code>HelloWorld.tsx</code>!
    </h3>;
  }
}
