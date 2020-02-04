export default class ApplicationAction {
    get adapter() {
        return {
            onGithubClick: this.openGithubWindow.bind(this)
        };
    }
    openGithubWindow() {
        window.open('https://github.com/enbock/Time-Tracker/', '_blank');
    }
}
