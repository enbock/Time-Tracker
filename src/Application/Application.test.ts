import ListenerAdapter from '@enbock/state-value-observer/ListenerAdapter';
import {ObserverAdapter} from '@enbock/state-value-observer/ValueObserver';
import React from 'react';
import Application, {Adapter} from './Application';
import ApplicationView, {Adapter as ViewAdapter} from './View/Application';
import Model from './View/Application/Model';
import Presenter from './View/Application/Presenter';

jest.mock('./View/Application');

describe('Application', () => {
  let presentSpy: jest.Mock,
    languageListener: ListenerAdapter<string>,
    moduleListener: ListenerAdapter<typeof React.Component | null>,
    menuOpenStateListener: ObserverAdapter<boolean>,
    renderSpy: jest.Mock,
    model: Model,
    applicationAdapter: Adapter,
    application: Application;

  beforeEach(() => {

    languageListener = new ListenerAdapter<string>();
    moduleListener = new ListenerAdapter<typeof React.Component | null>();
    menuOpenStateListener = new class implements ObserverAdapter<boolean> {
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
      (containerNode: Element | DocumentFragment | null, adapter: ViewAdapter) => {
        expect(containerNode).toBe(document.body);
        expect(adapter).toBe(applicationAdapter);

        return {
          render: renderSpy
        };
      }
    );
    const presenter: Presenter = jest.genMockFromModule<Presenter>('./View/Application/Presenter');
    presenter.present = presentSpy;
    application = new Application(applicationAdapter, presenter);
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
