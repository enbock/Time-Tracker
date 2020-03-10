export default class Router {
    constructor(pageObserver, history) {
        this.currentPage = pageObserver;
        this.history = history;
    }
    attachTo(window) {
        window.addEventListener('popstate', this.onHistoryChange.bind(this));
    }
    initialize(firstPage) {
        this.history.replaceState(firstPage, firstPage.name, firstPage.url);
        this.updatePage(firstPage);
    }
    changePage(newPage) {
        const currentPage = this.currentPage.value;
        if (currentPage.name == newPage.name) {
            return;
        }
        this.history.pushState(newPage, newPage.name, newPage.url);
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
