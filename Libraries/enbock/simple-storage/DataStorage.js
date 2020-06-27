import StorageAdapter from "./StorageAdapter.js";
export default class DataStorage {
    constructor(domain, storage) {
        this.domain = domain;
        this.storage = storage;
        this.adapters = {};
    }
    attach(key, adapter) {
        const callback = (newValue) => this.updateStorage(key, newValue);
        const storageAdapter = new StorageAdapter(adapter, callback);
        this.adapters[key] = storageAdapter;
        return storageAdapter;
    }
    loadData(key, initialValue) {
        const initJSON = this.storage.getItem(this.domain + '::' + key);
        let data = initialValue;
        if (initJSON != null) {
            data = JSON.parse(initJSON);
        }
        return data;
    }
    updateStorage(key, newValue) {
        this.storage.setItem(this.domain + '::' + key, JSON.stringify(newValue));
    }
}
