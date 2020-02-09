import Model from "./Model.js";
export default class Presenter {
    constructor(menuOpenState, languageSetupObserver, routerObserver, pageRegistry) {
        this.menuOpenState = menuOpenState;
        this.languageSetupObserver = languageSetupObserver;
        this.routerObserver = routerObserver;
        this.pageRegistry = pageRegistry;
    }
    present() {
        const model = new Model();
        model.isOpen = this.menuOpenState.value;
        const translator = this.languageSetupObserver.value.translator;
        model.translation = {
            home: translator.translate('Application.SideMenu.Home'),
            settings: translator.translate('Application.SideMenu.Settings')
        };
        const pages = this.pageRegistry.getPages();
        const activePage = this.routerObserver.value.name;
        model.pageNames = Object.keys(pages);
        model.pageNames.forEach((name) => {
            const page = pages[name];
            model.isActive[name] = (activePage == page.name);
            model.url[name] = page.url;
        });
        return model;
    }
}
