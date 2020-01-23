import React from 'react'
import {render} from '@testing-library/react'
import Application from './Application';
import ApplicationView from './Model/ApplicationView';

describe('Application: View', () => {
  it('Show', () => {
    const view: ApplicationView = new ApplicationView();
    view.compiler = 'compiler';
    view.framework = 'framework';

    const instance = render(<Application view={view} />);

    expect(instance.container.textContent).toContain('compiler');
    expect(instance.container.textContent).toContain('framework');
  });
});