import ApplicationModel from "./Application/ApplicationModel.js";
import TopAppBarModel from "./TopAppBar/TopAppBarModel.js";
export default class ModelFactory {
    createApplicationModel() {
        return new ApplicationModel();
    }
    createTopBarAppModel() {
        return new TopAppBarModel();
    }
}
