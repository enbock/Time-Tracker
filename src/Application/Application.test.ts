import React from 'react';
import ListenerAdapter from '../Observer/ListenerAdapter';
import {IObserverAdapter} from '../Observer/Observer';
import Application, {IAdapter} from './Application';
import ApplicationView, {IAdapter as IViewAdapter} from './View/Application';
import Model from './View/Application/Model';

jest.mock('./View/Application');

describe('Application', () => {
  let presentSpy: jest.Mock,
    languageListener: ListenerAdapter<string>,
    moduleListener: ListenerAdapter<typeof React.Component | null>,
    menuOpenStateListener: IObserverAdapter<boolean>,
    renderSpy: jest.Mock,
    model: Model,
    applicationAdapter: IAdapter,
    application: Application;

  beforeEach(() => {

    languageListener = new ListenerAdapter<string>();
    moduleListener = new ListenerAdapter<typeof React.Component | null>();
    menuOpenStateListener = new class implements IObserverAdapter<boolean> {
      public onChange(newValue: boolean): void {
      }
    };

    model = new Model();
    presentSpy = jest.fn();
    presentSpy.mockReturnValue(model);

    renderSpy = jest.fn();
    applicationAdapter = {
      onPageChanged: jest.fn(),
      onClose(): void {},
      onGithubClick(): void {},
      onMenu(name: string): void {},
      onMenuClick(): void {}
    };

    (ApplicationView as jest.Mock).mockImplementation(
      (containerNode: Element | DocumentFragment | null, adapter: IViewAdapter) => {
        expect(containerNode).toBe(document.body);
        expect(adapter).toBe(applicationAdapter);

        return {
          render: renderSpy
        };
      }
    );
    application = new Application(applicationAdapter, {present: presentSpy});
    application.attachToModuleState(moduleListener);
    application.attachToLanguage(languageListener);
    application.attachToMenuOpenState(menuOpenStateListener);
  });

  it('Can render', () => {
    application.run();
    expect(presentSpy).not.toHaveBeenCalled();
    expect(renderSpy).not.toHaveBeenCalled();

    application.attachToContainerNode(document.body);
    application.run();
    expect(presentSpy).toHaveBeenCalled();
    expect(renderSpy).toBeCalledWith(model);
  });

  it('Rerender on loaded language', (done) => {
    application.attachToContainerNode(document.body);
    languageListener.onChange('de-de');
    setTimeout(
      () => {
        expect(presentSpy).toHaveBeenCalled();
        expect(renderSpy).toBeCalledWith(model);
        done();
      },
      1
    );
  });

  it('Rerender on loaded module', (done) => {
    application.attachToContainerNode(document.body);
    moduleListener.onChange(null);
    setTimeout(
      () => {
        expect(presentSpy).toHaveBeenCalled();
        expect(renderSpy).toBeCalledWith(model);
        done();
      },
      1
    );
  });

  it('Rerender on menu change', () => {
    application.attachToContainerNode(document.body);
    menuOpenStateListener.onChange(true);
    expect(presentSpy).toHaveBeenCalled();
    expect(renderSpy).toBeCalledWith(model);
  });

  it('Does not render without container', () => {
    application.attachToContainerNode(null);
    menuOpenStateListener.onChange(true);
    expect(presentSpy).not.toHaveBeenCalled();
    expect(renderSpy).not.toBeCalledWith(model);
  });
})
;
