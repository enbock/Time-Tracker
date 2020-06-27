import {IPageData} from '@enbock/application-router/Router';
import ListenerAdapter from '@enbock/state-value-observer/ListenerAdapter';
import {IObserverAdapter} from '@enbock/state-value-observer/Observer';
import React from 'react';
import ApplicationView, {IAdapter as IViewAdapter} from './View/Application';
import Model from './View/Application/Model';
import {IPresenter as IApplicationPresenter} from './View/Application/Presenter';

export interface IModulePageData extends IPageData {
  module: string
}

export interface IAdapter extends IViewAdapter {
  onPageChanged(newValue: IPageData | null): void;
}

export default class Application {
  private readonly adapter: IAdapter;
  private readonly presenter: IApplicationPresenter;
  private view: ApplicationView | undefined;
  private readonly runCallback: () => void;

  constructor(adapter: IAdapter, presenter: IApplicationPresenter) {
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

  attachToMenuOpenState(adapter: IObserverAdapter<boolean>) {
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
