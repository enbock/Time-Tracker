const version = '1581265262';
const fileList = ["./Router/Router.js","./Router/Container.js","./Router/Registry.js","./favicon-196x196.png","./Style/material-components-web.min.css","./Style/Application.css","./Style/material-components-web.icons.css","./Style/Style.js","./Style/Themes/Codefrog.css","./Style/Themes/Google.css","./Observer/ListenerAdapter.js","./Observer/Observer.js","./index.html","./index.js","./favicon-196x196.webp","./Language/Manager.js","./Language/Translator.js","./Language/ChangeLanguageSetup.js","./Language/Container.js","./Language/Loader/Ajax.js","./Language/Translator/Factory.js","./Language/Loader.js","./favicon-512x512.png","./manifest.json","./HelloWorld.js","./Font/MaterialIcons-Regular.woff","./Font/MaterialIcons-Regular.woff2","./Font/MaterialIcons-Regular.ttf","./Font/RxZJdnzeo3R5zSexge8UUVtXRa8TVwTICgirnJhmVJw.woff2","./Font/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2","./Font/CWB0XYA8bzo0kSThX0UTuA.woff2","./Settings/Settings.js","./Application/Action.js","./Application/Container.js","./Application/Application.js","./Application/View/Page/Presenter.js","./Application/View/Page/Model.js","./Application/View/SideMenu.js","./Application/View/TopBar.js","./Application/View/SideMenu/Presenter.js","./Application/View/SideMenu/Model.js","./Application/View/Application.js","./Application/View/TopBar/Presenter.js","./Application/View/TopBar/Model.js","./Application/View/Application/Presenter.js","./Application/View/Application/Model.js","./Application/View/Page.js","./Application/ModuleLoader.js","./I18n/en-us.json","./I18n/de-de.json","./Libraries/material-components-web.min.js","./Libraries/react-dom.min.js","./Libraries/react.min.js","./favicon.ico","./favicon-128.png","./favicon-512x512.webp"];
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
        this.worker.skipWaiting(); // Not content immediately active (even partially)
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
