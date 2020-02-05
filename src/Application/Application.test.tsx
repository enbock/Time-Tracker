import {render, RenderResult} from '@testing-library/react';
import React from 'react';
import Application from './Application';
import Container from './Container';
import {IProperties} from './View/Application';
import Model from './View/Application/Model';

jest.mock('./Container', () => ({
  applicationPresenter: {present: jest.fn()},
  language: {
    setupObserver: {value: {languageCode: 'lang'}},
    setupAdapter: {addListener: jest.fn()},
    changeLanguageSetup: {interact: jest.fn()}
  },
  menuOpenState: {value: true},
  menuOpenStateAdapter: {onChange: undefined},
  applicationAction: {adapter: 'adapter-actions'}
}));
jest.mock(
  './View/Application',
  () => (props: IProperties) => <div data-testid="output">{props.model.text}{props.adapter}</div>
);

describe('Application.Application', () => {
  let presentSpy: jest.Mock, addListenerSpy: jest.Mock, interactorSpy: jest.Mock;

  beforeEach(() => {
    presentSpy = Container.applicationPresenter.present = jest.fn();
    addListenerSpy = Container.language.setupAdapter.addListener = jest.fn();
    interactorSpy = Container.language.changeLanguageSetup.interact = jest.fn();
  });

  it('Can start', async () => {
    const model: Model = new Model();
    model.text = 'labelText';
    presentSpy.mockReturnValue(model);
    const container: { callback: null | Function } = {
      callback: null
    };
    addListenerSpy.mockImplementation(callback => container.callback = callback);
    interactorSpy.mockResolvedValue(undefined);
    const instance: RenderResult = render(<Application />);

    const element: HTMLElement = await instance.findByTestId('output');
    expect(element.textContent).toContain(model.text);
    expect(element.textContent).toContain('adapter-actions');
    expect(container.callback).toBeInstanceOf(Function);
    expect(interactorSpy).toHaveBeenCalledWith({languageCode: 'de-de'}, {});
    expect(presentSpy).toHaveBeenCalledTimes(1);
  });

  it('Rerender on loaded language', async () => {
    const model: Model = new Model();
    model.text = 'labelText';
    presentSpy.mockReturnValue(model);
    const container: { callback: null | Function } = {
      callback: null
    };
    addListenerSpy.mockImplementation(callback => container.callback = callback);
    interactorSpy.mockResolvedValue(undefined);
    const instance: RenderResult = render(<Application />);

    container.callback && container.callback(undefined, {languageCode: 'de-de'});
    expect(presentSpy).toHaveBeenCalledTimes(2);
  });

  it('Rerender on menu change', async () => {
    presentSpy.mockReturnValue(new Model());
    interactorSpy.mockResolvedValue(undefined);
    const instance: RenderResult = render(<Application />);

    Container.menuOpenStateAdapter.onChange(false, true);
    expect(presentSpy).toHaveBeenCalledTimes(2);
  });
});