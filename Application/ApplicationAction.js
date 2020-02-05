export default class ApplicationAction {
    constructor(menuOpenState) {
        this.menuOpenState = menuOpenState;
    }
    get adapter() {
        return {
            onGithubClick: this.openGithubWindow.bind(this),
            onMenuClick: this.switchMenuState.bind(this)
        };
    }
    openGithubWindow() {
        window.open('https://github.com/enbock/Time-Tracker/', '_blank');
    }
    switchMenuState() {
        this.menuOpenState.value = !this.menuOpenState.value;
    }
}
