import {Observer} from '@enbock/state-value-observer/ValueObserver';
import React from 'react';
import Page from '../Page';
import Model from './Model';
import Presenter from './Presenter';

describe('Application.View.Page.Presenter', () => {
  it('Gives module', () => {
    const moduleState: Observer<typeof React.Component | null> = {
      value: Page
    };
    const expectedModel: Model = new Model();
    expectedModel.module = Page;

    const presenter = new Presenter(moduleState);
    const model: Model = presenter.present();
    expect(model).toEqual(expectedModel);
  });
});
