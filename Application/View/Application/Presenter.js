import Model from "./Model.js";
export default class Presenter {
    constructor(translator, topAppBarPresenter, sideMenuPresenter, pagePresenter) {
        this.translator = translator;
        this.topAppBarPresenter = topAppBarPresenter;
        this.sideMenuPresenter = sideMenuPresenter;
        this.pagePresenter = pagePresenter;
    }
    present() {
        const viewModel = new Model();
        const translator = this.translator.value;
        viewModel.topAppBar = this.topAppBarPresenter.present();
        viewModel.sideMenu = this.sideMenuPresenter.present();
        viewModel.page = this.pagePresenter.present();
        return viewModel;
    }
}
