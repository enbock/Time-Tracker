import {IObserverAdapter, IOnChangeCallback} from '../Observer/Observer';
import StorageAdapter from './StorageAdapter';

describe('Storage.StorageAdapter', () => {
  it('Calls callback and base adapter on change', () => {
    const baseAdapter: IObserverAdapter<string> = {onChange: jest.fn()};
    const callback: IOnChangeCallback<string> = jest.fn();

    const adapter: StorageAdapter<string> = new StorageAdapter<string>(baseAdapter, callback);
    adapter.onChange('old', 'new');

    expect(baseAdapter.onChange).toHaveBeenCalledWith('old', 'new');
    expect(callback).toHaveBeenCalledWith('old', 'new');
  });
});