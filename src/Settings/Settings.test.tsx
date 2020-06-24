import {render, RenderResult} from '@testing-library/react';
import React from 'react';
import Settings from './Settings';

describe('Settings', () => {
  it('Has text', () => {
    const instance: RenderResult = render(<Settings view={'any'} />);

    expect(instance.container.textContent).toContain('Vegetables');
  });
});
