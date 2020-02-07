import Model from "./Model.js";
export default class Presenter {
    constructor(languageSetupObserver) {
        this.languageSetupObserver = languageSetupObserver;
    }
    present() {
        const model = new Model();
        const translator = this.languageSetupObserver.value.translator;
        model.title = translator.translate('Application.TopBar.Title');
        return model;
    }
}
