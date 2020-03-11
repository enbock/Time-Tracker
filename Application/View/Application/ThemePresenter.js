import ThemeModel from "./ThemeModel.js";
export default class ThemePresenter {
    constructor(observer) {
        this.observer = observer;
    }
    present() {
        const currentTheme = this.observer.value;
        const view = new ThemeModel();
        view.external = !currentTheme.isBuildIn;
        view.source = currentTheme.url;
        return view;
    }
}
