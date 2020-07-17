const version = '1594985457';
const fileList = ["./Router/Container.js","./Style/material-components-web.min.css","./Style/Theme/ThemePatch.css","./Style/Theme/Codefrog.css","./Style/Theme/Google.css","./Style/Theme/Unknown.css","./Style/Application.css","./Style/material-components-web.icons.css","./Theme/Style.js","./Theme/Container.js","./Theme/ThemesRegistry.js","./Theme/ThemesManager.js","./settings/favicon.ico","./settings/index.html","./HelloWorld.js","./favicon.ico","./Font/RxZJdnzeo3R5zSexge8UUVtXRa8TVwTICgirnJhmVJw.woff2","./Font/MaterialIcons-Regular.woff2","./Font/MaterialIcons-Regular.woff","./Font/MaterialIcons-Regular.ttf","./Font/CWB0XYA8bzo0kSThX0UTuA.woff2","./Font/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2","./Libraries/material-components-web.min.js","./Libraries/enbock/simple-storage/StorageAdapter.js","./Libraries/enbock/simple-storage/DataStorage.js","./Libraries/enbock/application-router/Registry.js","./Libraries/enbock/application-router/Router.js","./Libraries/enbock/application-router/babel.config.js","./Libraries/enbock/state-value-observer/ListenerAdapter.js","./Libraries/enbock/state-value-observer/Observer.js","./Libraries/react-dom.min.js","./Libraries/react.min.js","./favicon-512x512.png","./I18n/de-de.json","./I18n/en-us.json","./Application/View/Page.js","./Application/View/Application/Presenter.js","./Application/View/Application/Model.js","./Application/View/Application/StyleUrlFormatter.js","./Application/View/Application.js","./Application/View/SideMenu/Presenter.js","./Application/View/SideMenu/Model.js","./Application/View/SideMenu.js","./Application/View/Page/Presenter.js","./Application/View/Page/Model.js","./Application/View/TopBar/Presenter.js","./Application/View/TopBar/Model.js","./Application/View/TopBar.js","./Application/MenuOpenStateAdapter.js","./Application/Application.js","./Application/Container.js","./Application/ModuleLoader.js","./Application/Action.js","./Language/Manager.js","./Language/Translator.js","./Language/Loader.js","./Language/Translator/Factory.js","./Language/Container.js","./Language/Loader/Ajax.js","./Language/Manager/ActiveTranslatorAdapter.js","./index.js","./favicon-128.png","./manifest.json","./favicon-196x196.png","./Migration/RouterData.js","./Migration/Migration.js","./favicon-512x512.webp","./index.html","./favicon-196x196.webp","./Settings/Settings.js"];
// https://developers.google.com/web/fundamentals/primers/service-workers
class ServiceWorkerManager {
    constructor(worker, caches, version, fileList) {
        this.worker = worker;
        this.caches = caches;
        this.version = version;
        this.fileList = fileList;
        this.worker.addEventListener('install', this.installCache.bind(this));
        this.worker.addEventListener('activate', this.activateCache.bind(this));
        this.worker.addEventListener('fetch', this.fetchRequest.bind(this));
    }
    installCache(event) {
        this.worker.skipWaiting(); // No wait, content immediately active (even partially)
        event.waitUntil(this.cacheFiles());
    }
    activateCache(event) {
        event.waitUntil(this.clearOldCaches());
    }
    fetchRequest(event) {
        event.respondWith(this.fetch(event.request));
    }
    async cacheFiles() {
        const cache = await this.caches.open(this.version);
        return cache.addAll(this.fileList);
    }
    async clearOldCaches() {
        const cacheNames = await this.caches.keys();
        return Promise.all(cacheNames.map((cacheName) => {
            if (cacheName != this.version) {
                return this.caches.delete(cacheName);
            }
        }));
    }
    async fetch(request) {
        const response = await this.caches.match(request);
        if (response) {
            return response;
        }
        const fetchResponse = await fetch(request);
        if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
            return fetchResponse;
        }
        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        const responseToCache = fetchResponse.clone();
        const cache = await this.caches.open(this.version);
        await cache.put(request, responseToCache);
        return fetchResponse;
    }
}
if (this) {
    new ServiceWorkerManager(this, caches, version, fileList);
}
