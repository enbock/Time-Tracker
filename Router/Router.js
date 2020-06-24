export default class Router {
    constructor(pageObserver, history) {
        this.currentPage = pageObserver;
        this.history = history;
    }
    attachTo(window) {
        window.addEventListener('popstate', this.onHistoryChange.bind(this));
    }
    initialize() {
        if (this.currentPage.value == null)
            return;
        const firstPage = this.currentPage.value;
        this.history.replaceState(firstPage, firstPage.name, firstPage.rootUrl);
        this.updatePage(firstPage);
    }
    changePage(newPage) {
        const currentPage = this.currentPage.value;
        if (currentPage != null && currentPage.name == newPage.name) {
            return;
        }
        this.history.replaceState(newPage, newPage.name, newPage.url);
        this.updatePage(newPage);
    }
    updatePage(page) {
        this.currentPage.value = page;
    }
    onHistoryChange(event) {
        const newPage = event.state;
        this.updatePage(newPage);
    }
}
