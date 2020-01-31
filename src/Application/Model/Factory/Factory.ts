import ApplicationModel from '../ApplicationModel';

export default class Factory {
  public createApplicationModel(): ApplicationModel {
    return new ApplicationModel();
  }
}