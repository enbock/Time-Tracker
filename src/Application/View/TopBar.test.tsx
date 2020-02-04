import {render, RenderResult} from '@testing-library/react';
import React from 'react';
import TopBar from './TopBar';
import Model from './TopBar/Model';

describe('Application.View.TopBar', () => {
  it('Show', async () => {
    const model: Model = new Model();
    model.title = 'title';

    const instance: RenderResult = render(<TopBar model={model} />);
    expect(instance.container.textContent).toContain('title');
  });
});