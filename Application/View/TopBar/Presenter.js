import Model from "./Model.js";
export default class Presenter {
    constructor(translator) {
        this.translator = translator;
    }
    present() {
        const model = new Model();
        const translator = this.translator.value;
        model.title = translator.translate('Application.TopBar.Title');
        model.sourceButtonLabel = translator.translate('Application.TopBar.Github');
        return model;
    }
}
