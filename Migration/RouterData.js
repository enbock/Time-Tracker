export default class RouterData {
    constructor(routerData) {
        this.routerData = routerData;
    }
    migrateRouterInternalToV102() {
        const pageData = this.routerData.value;
        if (pageData == null || pageData.rootUrl == undefined)
            return;
        this.routerData.value = {
            baseUrl: pageData.rootUrl,
            currentUrl: pageData.url,
            name: pageData.name,
            module: pageData.module
        };
    }
}
