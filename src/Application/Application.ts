import React from 'react';
import ListenerAdapter from '../Observer/ListenerAdapter';
import {IObserverAdapter} from '../Observer/Observer';
import {IPageData} from '../Router/Router';
import ApplicationView, {IAdapter as IViewAdapter} from './View/Application';
import Model from './View/Application/Model';
import {IPresenter as IApplicationPresenter}  from './View/Application/Presenter';

export interface IModulePageData extends IPageData {
  module: string
}

export interface IAdapter extends IViewAdapter {
  onPageChanged(newValue: IPageData): void;
}

export default class Application {
  private readonly adapter: IAdapter;
  private readonly presenter: IApplicationPresenter;
  private view: ApplicationView | undefined;
  private readonly renderCallback: OmitThisParameter<() => void>;

  constructor(adapter: IAdapter, presenter:IApplicationPresenter) {
    this.presenter = presenter;
    this.adapter = adapter;
    this.renderCallback = this.render.bind(this);
  }

  attachToLanguage(adapter:ListenerAdapter<string>) {
    adapter.addListener(this.renderCallback);
  }

  attachToModuleState(adapter:ListenerAdapter<typeof React.Component | null>) {
    adapter.addListener(this.renderCallback);
  }

  attachToMenuOpenState(adapter: IObserverAdapter<boolean>) {
    adapter.onChange = this.renderCallback;
  }

  attachToContainerNode(containerNode: Element | DocumentFragment | null) {
    if (containerNode == null) return;
    this.view = new ApplicationView(containerNode, this.adapter);
  }

  render() {
    if (this.view == undefined) return;

    const model: Model = this.presenter.present();
    this.view.render(model);
  }
}
