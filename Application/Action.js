export default class Action {
    constructor(menuOpenState) {
        this.menuOpenState = menuOpenState;
    }
    get adapter() {
        return {
            onGithubClick: this.openGithubWindow.bind(this),
            onMenuClick: this.switchMenuState.bind(this),
            onClose: this.closeMenu.bind(this)
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
}
