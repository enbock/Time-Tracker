import Model from "./Model.js";
export default class Presenter {
    constructor(menuOpenState, translator, routerObserver, pageRegistry) {
        this.translator = translator;
        this.menuOpenState = menuOpenState;
        this.routerObserver = routerObserver;
        this.pageRegistry = pageRegistry;
    }
    present() {
        const model = new Model();
        model.isOpen = this.menuOpenState.value;
        const translator = this.translator.value;
        model.translation = {
            home: translator.translate('Application.SideMenu.Home'),
            settings: translator.translate('Application.SideMenu.Settings')
        };
        const pages = this.pageRegistry.getPages();
        const activePage = this.routerObserver.value?.name || '';
        model.pageNames = [];
        pages.forEach((page) => {
            model.pageNames.push(page.name);
            model.isActive[page.name] = (activePage == page.name);
            model.url[page.name] = page.currentUrl;
        });
        return model;
    }
}
