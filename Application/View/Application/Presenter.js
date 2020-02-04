import Model from "./Model.js";
export default class Presenter {
    constructor(languageSetupObserver, topAppBarPresenter) {
        this.languageSetupObserver = languageSetupObserver;
        this.topAppBarPresenter = topAppBarPresenter;
    }
    present(data) {
        const viewModel = new Model();
        const translator = this.languageSetupObserver.value.translator;
        viewModel.text = data + translator.translate('Application.Test');
        viewModel.topAppBar = this.topAppBarPresenter.present();
        return viewModel;
    }
}
