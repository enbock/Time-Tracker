import {fireEvent, render, RenderResult} from '@testing-library/react';
import * as mdc from 'material-components-web';
import React from 'react';
import TopBar, {Adapter} from './TopBar';
import Model from './TopBar/Model';

jest.mock('material-components-web', () => ({topAppBar: {MDCTopAppBar: jest.fn()}}));

describe('Application.View.TopBar', () => {
  it('Show and connect callbacks', async () => {
    const model: Model = new Model();
    model.title = 'title';
    const onGithubClick = jest.fn();
    const adapter: Adapter = {
      onGithubClick: onGithubClick,
      onMenuClick: jest.fn()
    };
    const listen: jest.Mock = jest.fn();
    (mdc.topAppBar.MDCTopAppBar as any).mockImplementation(function () {
      return {listen: listen};
    });

    const instance: RenderResult = render(<TopBar model={model} adapter={adapter} />);
    expect(listen).toHaveBeenCalledWith('MDCTopAppBar:nav', adapter.onMenuClick);

    fireEvent.click(instance.getByTestId('github-button'));

    expect(instance.container.textContent).toContain('title');
    expect(onGithubClick).toHaveBeenCalled();
  });
});
