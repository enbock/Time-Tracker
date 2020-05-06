import {IObserverAdapter} from '../Observer/Observer';
import DataStorage from './DataStorage';
import StorageAdapter from './StorageAdapter';

describe('Storage.DataStorage', () => {
  let storage: Storage;
  beforeEach(() => {
    storage = {
      length: 0,
      clear: jest.fn(),
      getItem: jest.fn(),
      key: jest.fn(),
      removeItem: jest.fn(),
      setItem: jest.fn()
    };
  });

  it('Attach adapter and store value', () => {
    const dataStorage: DataStorage = new DataStorage('test', storage);
    const adapter: IObserverAdapter<string> = {onChange: jest.fn()};
    const storageAdapter: StorageAdapter<string> = dataStorage.attach<string>('value', adapter);

    storageAdapter.onChange('new');

    expect(adapter.onChange).toHaveBeenCalledWith('new');
    expect(storage.setItem).toHaveBeenCalledWith('test::value', JSON.stringify('new'));
  });

  it('Use init value on not loadable data', () => {
    const dataStorage: DataStorage = new DataStorage('test', storage);
    const getItem: jest.Mock = storage.getItem as jest.Mock;

    getItem.mockReturnValue(null);

    const result: string = dataStorage.loadData<string>('value', 'init');

    expect(getItem).toHaveBeenCalledWith('test::value');
    expect(result).toBe('init');
  });

  it('Load data', () => {
    const dataStorage: DataStorage = new DataStorage('test', storage);
    const getItem: jest.Mock = storage.getItem as jest.Mock;

    getItem.mockReturnValue(JSON.stringify('new'));

    const result: string = dataStorage.loadData<string>('value', 'init');

    expect(getItem).toHaveBeenCalledWith('test::value');
    expect(result).toBe('new');
  });
});