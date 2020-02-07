import Model from "./Model.js";
export default class Presenter {
    constructor(moduleState) {
        this.moduleState = moduleState;
    }
    present() {
        const model = new Model();
        model.module = this.moduleState.value;
        return model;
    }
}
