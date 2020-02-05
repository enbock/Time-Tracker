import {render, RenderResult} from '@testing-library/react';
import * as mdc from 'material-components-web';
import React from 'react';
import SideMenu from './SideMenu';
import Model from './SideMenu/Model';

jest.mock('material-components-web', () => ({drawer: {MDCDrawer: jest.fn()}}));

describe('Application.View.SideMenu', () => {
  let attachToSpy: jest.Mock;

  beforeEach(() => {
    attachToSpy = jest.fn();
  });

  it('Show', async () => {
    const model: Model = new Model();
    model.isOpen = true;
    const ui = <SideMenu model={model} />;
    const instance: RenderResult = render(ui);

    expect(instance.container.innerHTML).toContain('mdc-drawer');
  });

  it('Opens menu', async () => {
    const model: Model = new Model();
    model.isOpen = true;
    const value: any = {open: false};
    (mdc.drawer.MDCDrawer as any).mockImplementation(function () {
      return value;
    });

    const instance: RenderResult = render(<SideMenu model={model} />);
    instance.rerender(<SideMenu model={model} />);

    expect(value.open).toBe(true);
  });
});