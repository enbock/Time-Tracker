import {render, RenderResult} from '@testing-library/react';
import React from 'react';
import Style from './Style';

describe('Theme:Theme', () => {
  it('Shows external css', () => {
    const instance: RenderResult = render(<Style source="https://itbock.de/file.css" external={true} />);
    expect(instance.container.innerHTML).toContain('"https://itbock.de/file.css"');
  });

  it('Shows common css', () => {
    const instance: RenderResult = render(<Style source="file" />);
    expect(instance.container.innerHTML).toContain('"./Style/file.css"');
  });
});