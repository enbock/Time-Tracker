import {render, RenderResult} from '@testing-library/react';
import React from 'react';
import Page from './Page';
import Model from './Page/Model';

class TestModule extends React.Component<any, any> {
  render(): React.ReactElement {
    return <div>Test module</div>;
  }
}

describe('Application.View.Page', () => {
  it('Shows a module', () => {
    const model = new Model();
    model.module = TestModule;

    const instance: RenderResult = render(<Page model={model} />);

    expect(instance.container.textContent).toBe('Test module');
  });
});