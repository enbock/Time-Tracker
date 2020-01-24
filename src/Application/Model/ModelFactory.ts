import ApplicationModel from './ApplicationModel';

export default class ModelFactory {
  public createApplicationModel(): ApplicationModel {
    return new ApplicationModel();
  }
}