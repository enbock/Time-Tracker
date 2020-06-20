import Model from "./Model.js";
export default class Presenter {
    constructor(currentTheme, topAppBarPresenter, sideMenuPresenter, pagePresenter, styleUrlFormatter) {
        this.currentTheme = currentTheme;
        this.styleUrlFormatter = styleUrlFormatter;
        this.topAppBarPresenter = topAppBarPresenter;
        this.sideMenuPresenter = sideMenuPresenter;
        this.pagePresenter = pagePresenter;
        this.baseStyles = [];
        this.lastThemeStyles = [];
        this.lastTheme = '';
    }
    present() {
        const viewModel = new Model();
        viewModel.topAppBar = this.topAppBarPresenter.present();
        viewModel.sideMenu = this.sideMenuPresenter.present();
        viewModel.page = this.pagePresenter.present();
        if (this.baseStyles.length == 0) {
            this.baseStyles = [
                'material-components-web.min',
                'material-components-web.icons',
                'Application'
            ]
                .map((url) => {
                return this.styleUrlFormatter.format(url);
            });
        }
        const theme = this.currentTheme.value;
        if (this.lastTheme != theme.name) {
            this.lastTheme = theme.name;
            this.lastThemeStyles = [];
            this.lastThemeStyles.push(!theme.isBuildIn ? theme.url : this.styleUrlFormatter.format(theme.url));
            this.lastThemeStyles.push(this.styleUrlFormatter.format('Theme/ThemePatch'));
        }
        viewModel.styleSet = [...this.baseStyles, ...this.lastThemeStyles];
        return viewModel;
    }
}
