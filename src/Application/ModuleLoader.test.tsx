import {IObserver} from '@enbock/state-value-observer/Observer';
import {render, RenderResult} from '@testing-library/react';
import * as React from 'react';
import ModuleLoader from './ModuleLoader';

describe('Application.ModuleLoader', () => {
  it('Load a module', async () => {
    const moduleState: IObserver<typeof React.Component | null> = {
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
