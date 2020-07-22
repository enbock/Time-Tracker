import {fireEvent, render, RenderResult} from '@testing-library/react';
import * as mdc from 'material-components-web';
import React from 'react';
import SideMenu, {Adapter} from './SideMenu';
import Model from './SideMenu/Model';

jest.mock('material-components-web', () => ({drawer: {MDCDrawer: jest.fn()}}));

describe('Application.View.SideMenu', () => {
  let attachToSpy: jest.Mock, model: Model, adapter: Adapter, drawerMock: any;

  beforeEach(() => {
    attachToSpy = jest.fn();
    model = new Model();
    model.isOpen = true;
    model.pageNames = ['home', 'settings'];
    model.translation = {
      home: 'Home menu',
      settings: 'Settings menu'
    };
    model.isActive = {
      home: true,
      settings: false
    };
    model.url = {
      home: './home/',
      settings: './settings/'
    };
    adapter = {
      onClose: jest.fn(),
      onMenu: jest.fn()
    };
    drawerMock = {
      open: false,
      listen: jest.fn()
    };
    (mdc.drawer.MDCDrawer as any).mockImplementation(() => drawerMock);
  });

  it('Show', async () => {
    drawerMock = {
      open: false,
      listen: jest.fn().mockImplementation(
        function (event: string, callback: Function): void {
          expect(event).toBe('MDCDrawer:closed');
          expect(callback).toBe(adapter.onClose);
        }
      )
    };
    const instance: RenderResult = render(<SideMenu model={model} adapter={adapter} />);

    const htmlContent: string = instance.container.innerHTML;
    const textContent: string | null = instance.container.textContent;
    expect(htmlContent).toContain('mdc-drawer');
    expect(textContent).toContain('Home menu');
    expect(textContent).toContain('home'); //icon
    expect(htmlContent).toContain('class="mdc-list-item mdc-list-item--activated" href="./home/"');
    expect(textContent).toContain('Settings menu');
    expect(textContent).toContain('settings'); //icon
    expect(htmlContent).toContain('class="mdc-list-item" href="./settings/"');
    expect(htmlContent).toContain('tabindex="0"');
  });

  it('Opens menu', async () => {
    const instance: RenderResult = render(<SideMenu model={model} adapter={adapter} />);
    instance.rerender(<SideMenu model={model} adapter={adapter} />);

    expect(drawerMock.open).toBe(true);
  });

  it('Manage menu clicks', async () => {
    const instance: RenderResult = render(<SideMenu model={model} adapter={adapter} />);

    const event: React.MouseEvent<HTMLAnchorElement> | MouseEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    });
    event.stopPropagation = jest.fn();

    const settingsMenuElement: HTMLElement = await instance.findByTestId('settings');
    fireEvent(settingsMenuElement, event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(event.defaultPrevented).toBeTruthy(); // preventDefault() not mock able
    expect(adapter.onMenu).toHaveBeenCalledWith('settings');
  });
});
