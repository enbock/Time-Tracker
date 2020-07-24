class PageNotInRegistry extends Error {
}
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
            name: 'home',
            baseUrl: './',
            currentUrl: './',
            module: './HelloWorld'
        };
        const settingsPage = {
            name: 'settings',
            baseUrl: './settings/',
            currentUrl: './settings/',
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
        try {
            const page = this.getPageFromRegistry(name);
            this.router.changePage(page);
            this.closeMenu();
        }
        catch (notInRegistryError) {
        }
    }
    getPageFromRegistry(name) {
        let page = null;
        this.routerRegistry.getPages().forEach(function searchForName(item) {
            if (item.name == name)
                page = item;
        });
        if (page === null) {
            throw new PageNotInRegistry();
        }
        return page;
    }
    async loadModule(newValue) {
        await this.moduleLoader.loadModule(newValue.module);
    }
}
