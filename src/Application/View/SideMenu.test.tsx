import {render, RenderResult} from '@testing-library/react';
import * as mdc from 'material-components-web';
import React from 'react';
import SideMenu, {IAdapter} from './SideMenu';
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
    const adapter: IAdapter = {onClose: jest.fn()};
    const value: any = {
      open: false,
      listen: jest.fn().mockImplementation((event: string, callback: Function) => {
        expect(event).toBe('MDCDrawer:closed');
        expect(callback).toBe(adapter.onClose);
      })
    };
    (
      mdc.drawer.MDCDrawer as any
    ).mockImplementation(function () {
      return value;
    });
    const instance: RenderResult = render(<SideMenu model={model} adapter={adapter} />);

    expect(instance.container.innerHTML).toContain('mdc-drawer');
  });

  it('Opens menu', async () => {
    const model: Model = new Model();
    model.isOpen = true;
    const adapter: IAdapter = {onClose: jest.fn()};
    const value: any = {
      open: false,
      listen: jest.fn()
    };
    (
      mdc.drawer.MDCDrawer as any
    ).mockImplementation(function () {
      return value;
    });

    const instance: RenderResult = render(<SideMenu model={model} adapter={adapter} />);
    instance.rerender(<SideMenu model={model} adapter={adapter} />);

    expect(value.open).toBe(true);
  });
});