import React from 'react';
import {act} from 'react-dom/test-utils';
import Application, {IAdapter} from './Application';
import Model from './Application/Model';
import {IProperties as ISideMenuProperties} from './SideMenu';
import {IProperties as ITopBarProperties} from './TopBar';

jest.mock('./TopBar', () => (props: ITopBarProperties) => {
  props.adapter.onGithubClick();
  return <div>{props.model.title}</div>;
});
jest.mock('./SideMenu', () => (props: ISideMenuProperties) => {
  return <div>{props.model.pageNames.map((title: string) => <span key={title}>{title}</span>)}</div>;
});

describe('Application.View.Application', () => {
  it('Show', async () => {

    const model: Model = new Model();
    model.topAppBar.title = 'testTitle';
    model.sideMenu.pageNames.push('testHome');
    model.styleSet = ['./theme/style.css'];
    const adapter: IAdapter = {
      onMenu: jest.fn(),
      onGithubClick: jest.fn(),
      onMenuClick: jest.fn(),
      onClose: jest.fn()
    };
    adapter.toString = () => 'action-adapter';
    const container: HTMLElement = document.createElement('div');

    act(() => {
      const instance: Application = new Application(container, adapter);
      instance.render(model);
    });

    expect(container.textContent).toContain('testTitle');
    expect(container.textContent).toContain('testHome');
    expect(container.innerHTML).toContain('./theme/style.css');
  });
});
