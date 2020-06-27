import {IObserver} from '@enbock/state-value-observer/Observer';
import React from 'react';
import Model from './Model';

export default class Presenter {
  moduleState: IObserver<typeof React.Component | null>;

  constructor(moduleState: IObserver<typeof React.Component | null>) {
    this.moduleState = moduleState;
  }

  present() {
    const model: Model = new Model();
    model.module = this.moduleState.value;

    return model;
  }
}
