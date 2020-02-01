import {render, RenderResult} from '@testing-library/react'
import React from 'react';
import Application from './Application';
import Container from './Container';
import ApplicationModel from './View/Application/ApplicationModel';

jest.mock('./Container', () => ({
  applicationPresenter: {present: jest.fn()},
  language: {setupAdapter: {addListener: jest.fn()}, changeLanguageSetup: {interact: jest.fn()}}
}));
jest.mock('./View/Application', () => (props: any) => <div data-testid="output">{props.model.text}</div>);

describe('Application.Application', () => {
  let presentSpy: jest.Mock, addListenerSpy: jest.Mock, interactorSpy: jest.Mock;

  beforeEach(() => {
    presentSpy = Container.applicationPresenter.present = jest.fn();
    addListenerSpy = Container.language.setupAdapter.addListener = jest.fn();
    interactorSpy = Container.language.changeLanguageSetup.interact = jest.fn();
  });

  it('Can start', async () => {
    const model: ApplicationModel = new ApplicationModel();
    model.text = 'labelText';
    presentSpy.mockReturnValue(model);
    const container: { callback: null | Function } = {
      callback: null
    };
    addListenerSpy.mockImplementation(callback => container.callback = callback);
    interactorSpy.mockResolvedValue(undefined);
    const instance: RenderResult = render(<Application />);

    const element: HTMLElement = await instance.findByTestId('output');
    expect(element.textContent).toBe(model.text);
    expect(container.callback).toBeInstanceOf(Function);
    expect(interactorSpy).toHaveBeenCalledWith({languageCode: 'de-de'}, {});
    expect(presentSpy).toHaveBeenCalledTimes(1);
  });

  it('Rerender on loaded language', async () => {
    const model: ApplicationModel = new ApplicationModel();
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
});