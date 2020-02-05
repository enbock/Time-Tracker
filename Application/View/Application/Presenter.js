import Model from "./Model.js";
export default class Presenter {
    constructor(languageSetupObserver, topAppBarPresenter, sideMenuPresenter) {
        this.languageSetupObserver = languageSetupObserver;
        this.topAppBarPresenter = topAppBarPresenter;
        this.sideMenuPresenter = sideMenuPresenter;
    }
    present(data) {
        const viewModel = new Model();
        const translator = this.languageSetupObserver.value.translator;
        viewModel.text = data + translator.translate('Application.Test');
        viewModel.topAppBar = this.topAppBarPresenter.present();
        viewModel.sideMenu = this.sideMenuPresenter.present();
        return viewModel;
    }
}
