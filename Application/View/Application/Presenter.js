import Model from "./Model.js";
export default class Presenter {
    constructor(languageSetupObserver, topAppBarPresenter, sideMenuPresenter, pagePresenter) {
        this.languageSetupObserver = languageSetupObserver;
        this.topAppBarPresenter = topAppBarPresenter;
        this.sideMenuPresenter = sideMenuPresenter;
        this.pagePresenter = pagePresenter;
    }
    present() {
        const viewModel = new Model();
        const translator = this.languageSetupObserver.value.translator;
        viewModel.topAppBar = this.topAppBarPresenter.present();
        viewModel.sideMenu = this.sideMenuPresenter.present();
        viewModel.page = this.pagePresenter.present();
        return viewModel;
    }
}
