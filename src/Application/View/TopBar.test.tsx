import {fireEvent, render, RenderResult} from '@testing-library/react';
import React from 'react';
import TopBar, {IAdapter} from './TopBar';
import Model from './TopBar/Model';

describe('Application.View.TopBar', () => {
  it('Show', async () => {
    const model: Model = new Model();
    model.title = 'title';
    const onGithubClick = jest.fn();
    const adapter: IAdapter = {onGithubClick: onGithubClick};

    const instance: RenderResult = render(<TopBar model={model} adapter={adapter} />);

    fireEvent.click(instance.getByTestId('github-button'));

    expect(instance.container.textContent).toContain('title');
    expect(onGithubClick).toHaveBeenCalled();
  });
});