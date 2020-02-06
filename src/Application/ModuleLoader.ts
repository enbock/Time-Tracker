import React from 'react';
import {IObserver} from '../Observer/Observer';

interface ILoadedModuleDictionary {
  [name: string]: typeof React.Component,
}

export default class ModuleLoader {
  moduleState: IObserver<typeof React.Component | null>;
  moduleNameState: IObserver<string>;
  dictionary: ILoadedModuleDictionary;
  pathToRoot: string;

  constructor(
    pathToRoot: string,
    moduleNameState: IObserver<string>,
    moduleState: IObserver<typeof React.Component | null>
  ) {
    this.moduleNameState = moduleNameState;
    this.moduleState = moduleState;
    this.dictionary = {};
    this.pathToRoot = pathToRoot;

    this.moduleNameState.adapter.onChange = this.loadModule.bind(this);
  }

  async loadModule(oldValue: string, newValue: string) {
    let module: typeof React.Component;

    if (!this.dictionary.hasOwnProperty(newValue)) {
      module =
        (
          await import(this.pathToRoot + newValue + '.js')
        ).default as typeof React.Component;
      this.dictionary[newValue] = module;
    } else {
      module = this.dictionary[newValue];
    }

    this.moduleState.value = module;
  }
}