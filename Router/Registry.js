export default class Registry {
    constructor(observer, adapter) {
        this.observer = observer;
        this.adapter = adapter;
        this.dictionary = {};
        this.adapter.addListener(this.updatePageData.bind(this));
    }
    getPages() {
        const pages = {};
        Object.keys(this.dictionary).forEach((pageName) => {
            const registeredPage = this.dictionary[pageName];
            const page = registeredPage.page;
            pages[page.name] = page;
        });
        return pages;
    }
    registerPage(page) {
        const registeredPage = {
            page: page,
            sourceUrl: page.url
        };
        this.updatePageUrlByDepth(registeredPage, this.observer.value.depth, false);
        this.dictionary[page.name] = registeredPage;
    }
    updatePageData(oldValue, newValue) {
        Object.keys(this.dictionary).forEach((pageName) => {
            this.updatePageUrlByDepth(this.dictionary[pageName], newValue.depth, newValue.name == pageName);
        });
    }
    updatePageUrlByDepth(registeredPage, depth, removeDirectory) {
        let relativeBack = '', index = 0, newUrl = '';
        if (removeDirectory) {
            newUrl = registeredPage.sourceUrl.replace(/.*\//, './');
        }
        else {
            for (index = 0; index < depth; index++) {
                relativeBack += '../';
            }
            newUrl = (relativeBack + registeredPage.sourceUrl).replace('.././', '../');
        }
        registeredPage.page.url = newUrl;
    }
}
