import {render, RenderResult} from '@testing-library/react'
import React from 'react'
import Application from './Application';
import ApplicationModel from './Application/ApplicationModel';

jest.mock('./TopAppBar', () => (props: any) => <div data-testid="topAppBar">{props.model.title}</div>);

describe('Application.View.Application', () => {
  it('Show', async () => {
    const model: ApplicationModel = new ApplicationModel();
    model.text = 'a text';
    model.topAppBar.title = 'test';

    const instance: RenderResult = render(<Application model={model} />);

    const element: HTMLElement = await instance.findByTestId('topAppBar');
    expect(element.textContent).toBe('test');
    expect(instance.container.textContent).toContain('a text');
  });
});