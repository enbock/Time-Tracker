import React from 'react';
import {act} from 'react-dom/test-utils';
import Application, {Adapter} from './Application';
import Model from './Application/Model';
import {Properties as SideMenuProperties} from './SideMenu';
import {Properties as TopBarProperties} from './TopBar';

jest.mock('./TopBar', () => (props: TopBarProperties) => {
  props.adapter.onGithubClick();
  return <div>{props.model.title}</div>;
});
jest.mock('./SideMenu', () => (props: SideMenuProperties) => {
  return <div>{props.model.pageNames.map((title: string) => <span key={title}>{title}</span>)}</div>;
});

describe('Application.View.Application', () => {
  it('Show', async () => {

    const model: Model = new Model();
    model.topAppBar.title = 'testTitle';
    model.sideMenu.pageNames.push('testHome');
    model.styleSet = ['./theme/style.css'];
    const adapter: Adapter = {
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
