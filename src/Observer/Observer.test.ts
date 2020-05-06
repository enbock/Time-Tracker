import Observer, {IObserverAdapter, IOnChangeCallback} from './Observer';

describe('Observer.Observer', () => {
  it('Callback on change', () => {
    const callback: jest.MockedFunction<IOnChangeCallback<string>> = jest.fn();
    const adapter: IObserverAdapter<string> = {
      onChange: callback
    };

    const observer: Observer<string> = new Observer<string>('init', adapter);
    expect(observer.value).toEqual('init');

    observer.value = 'new';
    expect(observer.value).toEqual('new');
    expect(callback).toHaveBeenCalledWith('new');
  });
});