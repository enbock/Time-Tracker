import ApplicationModel from "../ApplicationModel.js";
export default class Factory {
    createApplicationModel() {
        return new ApplicationModel();
    }
}
