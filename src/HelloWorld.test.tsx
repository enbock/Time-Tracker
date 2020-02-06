import {render, RenderResult} from '@testing-library/react';
import React from 'react';
import HelloWorld from './HelloWorld';

describe('HelloWorld', () => {
  it('Has text', () => {
    const instance: RenderResult = render(<HelloWorld />);

    expect(instance.container.textContent).toContain('Hello');
  });
});