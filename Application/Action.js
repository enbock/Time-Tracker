export default class Action {
    constructor(menuOpenState, router, routerRegistry, moduleLoader) {
        this.menuOpenState = menuOpenState;
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
