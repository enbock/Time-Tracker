import {render, RenderResult} from '@testing-library/react';
import React from 'react';
import TopAppBar from './TopAppBar';
import TopAppBarModel from './TopAppBar/TopAppBarModel';

describe('Application.View.TopAppBar', () => {
  it('Show', async () => {
    const model: TopAppBarModel = new TopAppBarModel();
    model.title = 'title';

    const instance: RenderResult = render(<TopAppBar model={model} />);
    expect(instance.container.textContent).toContain('title');
  });
});