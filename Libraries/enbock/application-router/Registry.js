export default class Registry {
    constructor(observer) {
        this.observer = observer;
        this.dictionary = {};
    }
    attachAdapter(adapter) {
        adapter.addListener(this.updatePageData.bind(this));
    }
    getPages() {
        const pages = [];
        Object.keys(this.dictionary).forEach((pageName) => {
            const page = this.dictionary[pageName];
            pages.push(page);
        });
        return pages;
    }
    registerPage(page) {
        if (this.observer.value != null) {
            this.updatePageUrlByDepth(this.observer.value, page);
        }
        this.dictionary[page.name] = page;
    }
    updatePageData(newValue) {
        if (newValue == null)
            return;
        Object.keys(this.dictionary).forEach((pageName) => {
            this.updatePageUrlByDepth(newValue, this.dictionary[pageName]);
        });
    }
    updatePageUrlByDepth(currentPage, registeredPage) {
        let relativeBack = '', index = 0, newUrl;
        if (registeredPage == currentPage) {
            newUrl = registeredPage.baseUrl.replace(/.*\//, './');
        }
        else {
            const depth = currentPage.baseUrl.replace(/[^\/]*/g, '').length - 1;
            for (index = 0; index < depth; index++) {
                relativeBack += '../';
            }
            newUrl = (relativeBack + registeredPage.baseUrl).replace('.././', '../');
        }
        registeredPage.currentUrl = newUrl;
    }
}
