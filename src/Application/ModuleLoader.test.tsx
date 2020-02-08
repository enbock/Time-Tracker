import {render, RenderResult} from '@testing-library/react';
import React from 'react';
import {IObserver} from '../Observer/Observer';
import ModuleLoader from './ModuleLoader';

describe('Application.ModuleLoader', () => {
  it('Load a module', async () => {
    const moduleState: IObserver<typeof React.Component | null> = {
      adapter: {onChange: (oldValue, newValue) => {}},
      value: null
    };

    const moduleLoader: ModuleLoader = new ModuleLoader('./', moduleState);

    expect(moduleState.value).not.toBeUndefined();
    await moduleLoader.loadModule('ModuleLoaderTest');

    // @ts-ignore
    const instance: RenderResult = render(<moduleState.value />);
    expect(instance.container.textContent).toBe('module example');
  });

  it('Reuse loaded module', async () => {
    const moduleState: IObserver<typeof React.Component | null> = {
      adapter: {onChange: (oldValue, newValue) => {}},
      value: null
    };

    const moduleLoader: ModuleLoader = new ModuleLoader('./', moduleState);

    expect(moduleState.value).not.toBeUndefined();
    await moduleLoader.loadModule('ModuleLoaderTest');

    const oldValue: typeof React.Component | null = moduleState.value;
    await moduleLoader.loadModule('ModuleLoaderTest');
    expect(moduleState.value).toBe(oldValue);
  });
});