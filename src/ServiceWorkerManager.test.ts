import {ServiceWorkerGlobalScope, ServiceWorkerManager} from './ServiceWorkerManager';

describe('ServiceWorkerManager', () => {
  let caches: CacheStorage, worker: ServiceWorkerGlobalScope, cache: Cache;

  beforeEach(() => {
    caches = {
      delete: jest.fn(),
      has: jest.fn(),
      keys: jest.fn(),
      match: jest.fn(),
      open: jest.fn()
    };
    cache = {
      add: jest.fn(),
      addAll: jest.fn(),
      delete: jest.fn(),
      keys: jest.fn(),
      match: jest.fn(),
      matchAll: jest.fn(),
      put: jest.fn()
    };
    worker = {
      addEventListener: jest.fn(),
      skipWaiting: jest.fn(),
      caches: caches
    };
  });

  it('Creates', () => {
    const container: any = {};
    const addEventListenerSpy: jest.Mock = worker.addEventListener as jest.Mock;
    addEventListenerSpy.mockImplementation((type, callback) => container[type] = callback);

    const manager: ServiceWorkerManager = new ServiceWorkerManager(worker, caches, 'version', ['file list']);

    expect(container.install).toBeInstanceOf(Function);
    expect(container.activate).toBeInstanceOf(Function);
    expect(container.fetch).toBeInstanceOf(Function);
  });

  it('Cache files', (done) => {
    const container: any = {install: new Function()};
    const addEventListenerSpy: jest.Mock = worker.addEventListener as jest.Mock;
    const openSpy: jest.Mock = caches.open as jest.Mock;
    addEventListenerSpy.mockImplementation((type, callback) => container[type] = callback);
    const event: any = {waitUntil: jest.fn()};

    const manager: ServiceWorkerManager = new ServiceWorkerManager(worker, caches, 'version', ['file list']);

    openSpy.mockResolvedValue(cache);
    (cache.addAll as jest.Mock).mockResolvedValue(null);
    event.waitUntil = (promise: Promise<void>) => {
      promise.then(() => {
        expect(worker.skipWaiting).toHaveBeenCalled();
        expect(openSpy).toHaveBeenCalledWith('version');
        expect(cache.addAll as jest.Mock).toHaveBeenCalledWith(['file list']);
        done();
      });
    };

    container.install(event);
  });

  it('Clear old files', (done) => {
    const container: any = {activate: new Function()};
    const addEventListenerSpy: jest.Mock = worker.addEventListener as jest.Mock;
    const keySpy: jest.Mock = caches.keys as jest.Mock;
    addEventListenerSpy.mockImplementation((type, callback) => container[type] = callback);
    const event: any = {waitUntil: jest.fn()};

    const manager: ServiceWorkerManager = new ServiceWorkerManager(worker, caches, 'version', ['file list']);

    keySpy.mockResolvedValue(['version', 'old']);
    (cache.addAll as jest.Mock).mockResolvedValue(null);
    event.waitUntil = (promise: Promise<void>) => {
      promise.then(() => {
        expect(caches.delete as jest.Mock).toHaveBeenCalledWith('old');
        done();
      });
    };

    container.activate(event);
  });

  it('Fetch cached request', (done) => {
    const container: any = {fetch: new Function()};
    const addEventListenerSpy: jest.Mock = worker.addEventListener as jest.Mock;
    const matchSpy: jest.Mock = caches.match as jest.Mock;
    addEventListenerSpy.mockImplementation((type, callback) => container[type] = callback);
    const event: any = {
      request: 'request',
      respondWith: jest.fn()
    };

    const manager: ServiceWorkerManager = new ServiceWorkerManager(worker, caches, 'version', ['file list']);

    matchSpy.mockResolvedValue('response');
    event.respondWith = (promise: Promise<void>) => {
      promise.then((response) => {
        expect(response).toBe('response');

        delete (window.fetch);
        done();
      });
    };

    container.fetch(event);
  });

  it('Fetch not cached failing request (no response)', (done) => {
    const container: any = {fetch: new Function()};
    const addEventListenerSpy: jest.Mock = worker.addEventListener as jest.Mock;
    const openSpy: jest.Mock = caches.open as jest.Mock;
    const matchSpy: jest.Mock = caches.match as jest.Mock;
    addEventListenerSpy.mockImplementation((type, callback) => container[type] = callback);
    const event: any = {
      request: 'request',
      respondWith: jest.fn()
    };
    const fetchPromise: Promise<any> = Promise.resolve(undefined);
    const fetchSpy: jest.Mock = window.fetch = jest.fn().mockImplementation(() => fetchPromise);

    const manager: ServiceWorkerManager = new ServiceWorkerManager(worker, caches, 'version', ['file list']);

    matchSpy.mockResolvedValue(undefined);
    openSpy.mockResolvedValue(cache);
    (cache.addAll as jest.Mock).mockResolvedValue(null);
    event.respondWith = (promise: Promise<void>) => {
      promise.then((response) => {
        expect(response).toBeUndefined();

        delete (window.fetch);
        done();
      });
    };

    container.fetch(event);
  });

  it('Fetch not cached failing request (not 200)', (done) => {
    const container: any = {fetch: new Function()};
    const addEventListenerSpy: jest.Mock = worker.addEventListener as jest.Mock;
    const openSpy: jest.Mock = caches.open as jest.Mock;
    const matchSpy: jest.Mock = caches.match as jest.Mock;
    addEventListenerSpy.mockImplementation((type, callback) => container[type] = callback);
    const event: any = {
      request: 'request',
      respondWith: jest.fn()
    };
    const response: any = {
      status: 404,
      type: 'not found',
      clone: jest.fn()
    };
    const fetchPromise: Promise<any> = Promise.resolve(response);
    const fetchSpy: jest.Mock = window.fetch = jest.fn().mockImplementation(() => fetchPromise);

    const manager: ServiceWorkerManager = new ServiceWorkerManager(worker, caches, 'version', ['file list']);

    matchSpy.mockResolvedValue(undefined);
    openSpy.mockResolvedValue(cache);
    (cache.addAll as jest.Mock).mockResolvedValue(null);
    event.respondWith = (promise: Promise<void>) => {
      promise.then((response: any) => {
        expect(response).toBe(response);
        expect(response.clone).not.toHaveBeenCalled();

        delete (window.fetch);
        done();
      });
    };

    container.fetch(event);
  });

  it('Fetch not cached failing request (not basic response)', (done) => {
    const container: any = {fetch: new Function()};
    const addEventListenerSpy: jest.Mock = worker.addEventListener as jest.Mock;
    const openSpy: jest.Mock = caches.open as jest.Mock;
    const matchSpy: jest.Mock = caches.match as jest.Mock;
    addEventListenerSpy.mockImplementation((type, callback) => container[type] = callback);
    const event: any = {
      request: 'request',
      respondWith: jest.fn()
    };
    const response: any = {
      status: 200,
      type: 'cached',
      clone: jest.fn()
    };
    const fetchPromise: Promise<any> = Promise.resolve(response);
    const fetchSpy: jest.Mock = window.fetch = jest.fn().mockImplementation(() => fetchPromise);

    const manager: ServiceWorkerManager = new ServiceWorkerManager(worker, caches, 'version', ['file list']);

    matchSpy.mockResolvedValue(undefined);
    openSpy.mockResolvedValue(cache);
    (cache.addAll as jest.Mock).mockResolvedValue(null);
    event.respondWith = (promise: Promise<void>) => {
      promise.then((response: any) => {
        expect(response).toBe(response);
        expect(response.clone).not.toHaveBeenCalled();

        delete (window.fetch);
        done();
      });
    };

    container.fetch(event);
  });

  it('Fetch request to cache', (done) => {
    const container: any = {fetch: new Function()};
    const addEventListenerSpy: jest.Mock = worker.addEventListener as jest.Mock;
    const openSpy: jest.Mock = caches.open as jest.Mock;
    const matchSpy: jest.Mock = caches.match as jest.Mock;
    const putSpy: jest.Mock = cache.put as jest.Mock;
    addEventListenerSpy.mockImplementation((type, callback) => container[type] = callback);
    const event: any = {
      request: 'request',
      respondWith: jest.fn()
    };
    const response: any = {
      status: 200,
      type: 'basic',
      clone: jest.fn()
    };
    const clonedResponse: any = {type: 'clone'};
    const fetchPromise: Promise<any> = Promise.resolve(response);
    const fetchSpy: jest.Mock = window.fetch = jest.fn().mockImplementation(() => fetchPromise);

    const manager: ServiceWorkerManager = new ServiceWorkerManager(worker, caches, 'version', ['file list']);

    matchSpy.mockResolvedValue(undefined);
    response.clone.mockReturnValue(clonedResponse);
    openSpy.mockResolvedValue(cache);
    putSpy.mockResolvedValue(null);
    event.respondWith = (promise: Promise<void>) => {
      promise.then((result) => {
        expect(result).toBe(response);
        expect(matchSpy).toHaveBeenCalledWith('request');
        expect(openSpy).toHaveBeenCalledWith('version');
        expect(putSpy).toHaveBeenCalledWith('request', clonedResponse);

        delete (window.fetch);
        done();
      });
    };

    container.fetch(event);
  });
});
