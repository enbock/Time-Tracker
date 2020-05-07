import Model from "./Model.js";
export default class Presenter {
    constructor(translator, topAppBarPresenter, sideMenuPresenter, pagePresenter, themePresenter) {
        this.themePresenter = themePresenter;
        this.translator = translator;
        this.topAppBarPresenter = topAppBarPresenter;
        this.sideMenuPresenter = sideMenuPresenter;
        this.pagePresenter = pagePresenter;
    }
    present() {
        const viewModel = new Model();
        //const translator: Translator = this.translator.value;
        viewModel.topAppBar = this.topAppBarPresenter.present();
        viewModel.sideMenu = this.sideMenuPresenter.present();
        viewModel.page = this.pagePresenter.present();
        viewModel.theme = this.themePresenter.present();
        return viewModel;
    }
}
