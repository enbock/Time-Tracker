import {render, RenderResult} from '@testing-library/react'
import React from 'react'
import Application, {IAdapter} from './Application';
import Model from './Application/Model';
import {IProperties} from './TopBar';

jest.mock('./TopBar', () => (props: IProperties) => {
  props.adapter.onGithubClick();
  return <div data-testid="topAppBar">{props.model.title}</div>;
});

describe('Application.View.Application', () => {
  it('Show', async () => {

    const model: Model = new Model();
    model.text = 'a text';
    model.topAppBar.title = 'test';
    const onGithubClick = jest.fn();
    const adapter: IAdapter = {onGithubClick: onGithubClick};
    adapter.toString = () => 'action-adapter';

    const instance: RenderResult = render(<Application model={model} adapter={adapter} />);

    const element: HTMLElement = await instance.findByTestId('topAppBar');
    expect(element.textContent).toBe('test');
    expect(instance.container.textContent).toContain('a text');
    expect(onGithubClick).toHaveBeenCalled();
  });
});