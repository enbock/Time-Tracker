import {render, RenderResult} from '@testing-library/react'
import React from 'react'
import ApplicationModel from '../Model/ApplicationModel';
import ApplicationView from './ApplicationView';

describe('Application.View.ApplicationView', () => {
  it('Show', () => {
    const model: ApplicationModel = new ApplicationModel();
    model.text = 'a text';

    const instance: RenderResult = render(<ApplicationView model={model} />);

    expect(instance.container.textContent).toContain('a text');
  });
});