import {Observer} from '@enbock/state-value-observer/ValueObserver';
import React from 'react';

interface LoadedModuleDictionary {
  [name: string]: typeof React.Component,
}

export default class ModuleLoader {
  moduleState: Observer<typeof React.Component | null>;
  dictionary: LoadedModuleDictionary;
  pathToRoot: string;

  constructor(pathToRoot: string, moduleState: Observer<typeof React.Component | null>) {
    this.moduleState = moduleState;
    this.dictionary = {};
    this.pathToRoot = pathToRoot;
  }

  async loadModule(modulePath: string) {
    let module: typeof React.Component;

    if (!this.dictionary.hasOwnProperty(modulePath)) {
      const filePath = (this.pathToRoot + modulePath + '.js').replace('.././', '../');
      module = (await import(filePath)).default as typeof React.Component;
      this.dictionary[modulePath] = module;
    } else {
      module = this.dictionary[modulePath];
    }

    this.moduleState.value = module;
  }
}
