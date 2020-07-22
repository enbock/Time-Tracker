import {PageData} from '@enbock/application-router/Router';
import ListenerAdapter from '@enbock/state-value-observer/ListenerAdapter';
import {ObserverAdapter} from '@enbock/state-value-observer/ValueObserver';
import React from 'react';
import ApplicationView, {Adapter as ViewAdapter} from './View/Application';
import Model from './View/Application/Model';
import ApplicationPresenter from './View/Application/Presenter';

export interface ModulePageData extends PageData {
  module: string
}

export interface Adapter extends ViewAdapter {
  onPageChanged(newValue: PageData | null): void;
}

export default class Application {
  private readonly adapter: Adapter;
  private readonly presenter: ApplicationPresenter;
  private view: ApplicationView | undefined;
  private readonly runCallback: () => void;

  constructor(adapter: Adapter, presenter: ApplicationPresenter) {
    this.presenter = presenter;
    this.adapter = adapter;
    this.runCallback = this.run.bind(this);
  }

  attachToLanguage(adapter: ListenerAdapter<string>) {
    adapter.addListener(this.runCallback);
  }

  attachToModuleState(adapter: ListenerAdapter<typeof React.Component | null>) {
    adapter.addListener(this.runCallback);
  }

  attachToMenuOpenState(adapter: ObserverAdapter<boolean>) {
    adapter.onChange = this.runCallback;
  }

  attachToContainerNode(containerNode: Element | DocumentFragment | null) {
    if (containerNode == null) return;
    this.view = new ApplicationView(containerNode, this.adapter);
  }

  run() {
    if (this.view == undefined) return;

    const model: Model = this.presenter.present();
    this.view.render(model);
  }
}
