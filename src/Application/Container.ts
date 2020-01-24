import ModelFactory from './Model/ModelFactory';

export interface IContainer {
  ModelFactory: ModelFactory
}

class Container {
  public container: IContainer;

  constructor() {
    this.container = {
      ModelFactory: new ModelFactory()
    };
  }

  get ModelFactory(): ModelFactory {
    return this.container.ModelFactory;
  }
}

export default new Container();