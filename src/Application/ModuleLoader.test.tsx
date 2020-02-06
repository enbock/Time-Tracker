import {render, RenderResult} from '@testing-library/react';
import React from 'react';
import {IObserver} from '../Observer/Observer';
import ModuleLoader from './ModuleLoader';

describe('Application.ModuleLoader', () => {
  it('Load a module', async () => {
    const moduleNameState: IObserver<string> = {
        adapter: {onChange: (oldValue, newValue) => {}},
        value: ''
      },
      moduleState: IObserver<typeof React.Component | null> = {
        adapter: {onChange: (oldValue, newValue) => {}},
        value: null
      }
    ;

    const moduleLoader = new ModuleLoader('./', moduleNameState, moduleState);
    await moduleNameState.adapter.onChange('', 'ModuleLoaderTest');

    expect(moduleState.value).not.toBeUndefined();
    // @ts-ignore
    const instance: RenderResult = render(<moduleState.value />);
    expect(instance.container.textContent).toBe('module example');
  });

  it('Reuse loaded module', async () => {
    const moduleNameState: IObserver<string> = {
        adapter: {onChange: (oldValue, newValue) => {}},
        value: ''
      },
      moduleState: IObserver<typeof React.Component | null> = {
        adapter: {onChange: (oldValue, newValue) => {}},
        value: null
      }
    ;

    const moduleLoader = new ModuleLoader('./', moduleNameState, moduleState);
    await moduleNameState.adapter.onChange('', 'ModuleLoaderTest');

    expect(moduleState.value).not.toBeUndefined();

    const oldValue: typeof React.Component | null = moduleState.value;
    await moduleNameState.adapter.onChange('', 'ModuleLoaderTest');
    expect(moduleState.value).toBe(oldValue);
  });
});