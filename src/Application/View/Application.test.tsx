import {render, RenderResult} from '@testing-library/react';
import React from 'react';
import Application, {IAdapter} from './Application';
import Model from './Application/Model';
import {IProperties as ISideMenuProperties} from './SideMenu';
import {IProperties as ITopBarProperties} from './TopBar';

jest.mock('./TopBar', () => (props: ITopBarProperties) => {
  props.adapter.onGithubClick();
  return <div data-testid="topAppBar">{props.model.title}</div>;
});
jest.mock('./SideMenu', () => (props: ISideMenuProperties) => {
  return <div data-testid="sideMenu">menu</div>;
});

describe('Application.View.Application', () => {
  it('Show', async () => {

    const model: Model = new Model();
    model.topAppBar.title = 'test';
    const onGithubClick = jest.fn();
    const adapter: IAdapter = {
      onMenu: jest.fn(),
      onGithubClick: onGithubClick,
      onMenuClick: jest.fn(),
      onClose: jest.fn()
    };
    adapter.toString = () => 'action-adapter';

    const instance: RenderResult = render(<Application model={model} adapter={adapter} />);

    let element: HTMLElement = await instance.findByTestId('topAppBar');
    expect(element.textContent).toBe('test');
    element = await instance.findByTestId('sideMenu');
    expect(element.textContent).toBe('menu');
    expect(onGithubClick).toHaveBeenCalled();
  });
});