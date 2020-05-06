import {IObserverAdapter, IOnChangeCallback} from '../Observer/Observer';
import StorageAdapter from './StorageAdapter';

export interface IAdapterDictionary {
  [index: string]: StorageAdapter<any>
}

export default class DataStorage {
  protected domain: string;
  protected storage: Storage;
  protected adapters: IAdapterDictionary;

  constructor(domain: string, storage: Storage) {
    this.domain = domain;
    this.storage = storage;
    this.adapters = {};
  }

  attach<T>(key: string, adapter: IObserverAdapter<T>): StorageAdapter<T> {
    const callback: IOnChangeCallback<T> = (newValue: T) => this.updateStorage(key, newValue);
    const storageAdapter: StorageAdapter<T> = new StorageAdapter<T>(adapter, callback);
    this.adapters[key] = storageAdapter;

    return storageAdapter;
  }

  loadData<T>(key: string, initialValue: T): T {
    const initJSON: string | null = this.storage.getItem(this.domain + '::' + key);
    let data: T = initialValue;
    if (initJSON != null) {
      data = JSON.parse(initJSON) as T;
    }

    return data;
  }

  protected updateStorage<T>(key: string, newValue: T) {
    this.storage.setItem(this.domain + '::' + key, JSON.stringify(newValue));
  }
}