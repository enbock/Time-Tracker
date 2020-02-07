import Model from "./Model.js";
export default class Presenter {
    constructor(menuOpenState) {
        this.menuOpenState = menuOpenState;
    }
    present() {
        const model = new Model();
        model.isOpen = this.menuOpenState.value;
        return model;
    }
}
