import {render, RenderResult} from '@testing-library/react';
import React from 'react';
import Application from './Application';
import Container from './Container';
import {IProperties} from './View/Application';
import Model from './View/Application/Model';

jest.mock(
  './Container',
  () => (
    {
      applicationPresenter: {present: jest.fn()},
      language: {
        observer: {value: {languageCode: 'lang'}},
        adapter: {addListener: jest.fn()},
        changeLanguageSetup: {interact: jest.fn()}
      },
      router: {
        observer: {value: {name: 'home'}},
        adapter: {addListener: jest.fn()},
        registry: {registerPage: jest.fn()}
      },
      menuOpenState: {value: true},
      menuOpenStateAdapter: {onChange: undefined},
      applicationAction: {adapter: 'adapter-actions'},
      moduleStateAdapter: {addListener: jest.fn()},
      moduleNameState: {value: ''},
      moduleLoader: {loadModule: jest.fn()}
    }
  )
);
jest.mock(
  './View/Application',
  () => (props: IProperties) => <div data-testid="output">{props.adapter}</div>
);

describe('Application', () => {
  let presentSpy: jest.Mock, languageListenerSpy: jest.Mock, moduleListenerSpy: jest.Mock, interactorSpy: jest.Mock;

  beforeEach(() => {
    presentSpy = Container.applicationPresenter.present = jest.fn();
    languageListenerSpy = Container.language.adapter.addListener = jest.fn();
    moduleListenerSpy = Container.moduleStateAdapter.addListener = jest.fn();
    interactorSpy = Container.language.changeLanguageSetup.interact = jest.fn();
  });

  it('Can start', async () => {
    const model: Model = new Model();
    presentSpy.mockReturnValue(model);
    const container: any = {
      languageCallback: null,
      moduleCallback: null
    };
    languageListenerSpy.mockImplementation(callback => container.languageCallback = callback);
    moduleListenerSpy.mockImplementation(callback => container.moduleCallback = callback);
    interactorSpy.mockResolvedValue(undefined);
    const instance: RenderResult = render(<Application />);

    const element: HTMLElement = await instance.findByTestId('output');
    expect(element.textContent).toContain('adapter-actions');
    expect(container.languageCallback).toBeInstanceOf(Function);
    expect(container.moduleCallback).toBeInstanceOf(Function);
    expect(interactorSpy).toHaveBeenCalledWith({languageCode: 'de-de'}, {});
    expect(presentSpy).toHaveBeenCalledTimes(1);
  });

  it('Rerender on loaded language', async () => {
    const model: Model = new Model();
    presentSpy.mockReturnValue(model);
    const container: { callback: null | Function } = {
      callback: null
    };
    languageListenerSpy.mockImplementation(callback => container.callback = callback);
    interactorSpy.mockResolvedValue(undefined);
    const instance: RenderResult = render(<Application />);

    container.callback && container.callback(undefined, {languageCode: 'de-de'});
    expect(presentSpy).toHaveBeenCalledTimes(2);
  });

  it('Rerender on loaded module', async () => {
    const model: Model = new Model();
    presentSpy.mockReturnValue(model);
    const container: { callback: null | Function } = {
      callback: null
    };
    moduleListenerSpy.mockImplementation(callback => container.callback = callback);
    interactorSpy.mockResolvedValue(undefined);
    const instance: RenderResult = render(<Application />);

    container.callback && container.callback(null, Application);
    expect(presentSpy).toHaveBeenCalledTimes(2);
  });

  it('Rerender on menu change', async () => {
    presentSpy.mockReturnValue(new Model());
    interactorSpy.mockResolvedValue(undefined);
    const instance: RenderResult = render(<Application />);

    Container.menuOpenStateAdapter.onChange(false, true);
    expect(presentSpy).toHaveBeenCalledTimes(2);
  });

  it('Load on changed page', async () => {
    const model: Model = new Model();
    const listenerSpy: jest.Mock = Container.router.adapter.addListener = jest.fn();
    const loaderSpy: jest.Mock = Container.moduleLoader.loadModule = jest.fn();
    presentSpy.mockReturnValue(model);
    loaderSpy.mockResolvedValue(undefined);
    const container: { callback: null | Function } = {
      callback: null
    };
    listenerSpy.mockImplementation(callback => container.callback = callback);
    interactorSpy.mockResolvedValue(undefined);
    const instance: RenderResult = render(<Application />);

    container.callback && container.callback('', {url: './new/module/'});
    expect(loaderSpy).toHaveBeenCalledWith('./new/module/');
  });
});