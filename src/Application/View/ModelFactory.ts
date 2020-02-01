import ApplicationModel from './Application/ApplicationModel';
import TopAppBarModel from './TopAppBar/TopAppBarModel';

export default class ModelFactory {
  createApplicationModel(): ApplicationModel {
    return new ApplicationModel();
  }

  createTopBarAppModel(): TopAppBarModel {
    return new TopAppBarModel();
  }
}