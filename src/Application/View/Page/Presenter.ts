import {Observer} from '@enbock/state-value-observer/ValueObserver';
import React from 'react';
import Model from './Model';

export default class Presenter {
  moduleState: Observer<typeof React.Component | null>;

  constructor(moduleState: Observer<typeof React.Component | null>) {
    this.moduleState = moduleState;
  }

  present() {
    const model: Model = new Model();
    model.module = this.moduleState.value;

    return model;
  }
}
