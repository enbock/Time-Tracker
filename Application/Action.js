export default class Action {
    constructor(menuOpenState, currentPage, router, routerRegistry, routerAdapter, moduleLoader) {
        this.routerAdapter = routerAdapter;
        this.menuOpenState = menuOpenState;
        this.currentPage = currentPage;
        this.router = router;
        this.routerRegistry = routerRegistry;
        this.moduleLoader = moduleLoader;
    }
    get adapter() {
        return {
            onPageChanged: this.loadModule.bind(this),
            onGithubClick: this.openGithubWindow.bind(this),
            onMenuClick: this.switchMenuState.bind(this),
            onClose: this.closeMenu.bind(this),
            onMenu: this.switchPage.bind(this)
        };
    }
    loadPageConfig() {
        const homePage = {
            depth: 0,
            name: 'home',
            rootUrl: './',
            url: './',
            module: './HelloWorld'
        };
        const settingsPage = {
            depth: 1,
            name: 'settings',
            rootUrl: './settings/',
            url: './settings/',
            module: './Settings/Settings'
        };
        this.routerRegistry.registerPage(homePage);
        this.routerRegistry.registerPage(settingsPage);
        if (this.currentPage.value == null) {
            this.router.changePage(homePage);
        }
        else {
            this.routerAdapter.onChange(this.currentPage.value);
        }
    }
    openGithubWindow() {
        window.open('https://github.com/enbock/Time-Tracker/', '_blank');
    }
    switchMenuState() {
        this.menuOpenState.value = !this.menuOpenState.value;
    }
    closeMenu() {
        this.menuOpenState.value = false;
    }
    switchPage(name) {
        const page = this.routerRegistry.getPages()[name];
        this.router.changePage(page);
        this.closeMenu();
    }
    async loadModule(newValue) {
        await this.moduleLoader.loadModule(newValue.module);
    }
}
