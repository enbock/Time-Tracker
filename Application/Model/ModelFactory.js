import ApplicationModel from "./ApplicationModel.js";
export default class ModelFactory {
    createApplicationModel() {
        return new ApplicationModel();
    }
}
