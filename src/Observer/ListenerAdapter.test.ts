import ListenerAdapter from './ListenerAdapter';
import {IOnChangeCallback} from './Observer';

describe('Observer.ListenerAdapter', () => {
  it('registers and call on change', (done) => {
    const callback: IOnChangeCallback<string> = jest.fn();
    const adapter: ListenerAdapter<string> = new ListenerAdapter<string>();

    adapter.addListener(callback);
    adapter.onChange('new');
    setTimeout(() => {
      expect(callback).toHaveBeenCalledWith('new');
      done();
    }, 1);
  });

  it('removes listener', () => {
    const callback: IOnChangeCallback<string> = jest.fn();
    const adapter: ListenerAdapter<string> = new ListenerAdapter<string>();
    adapter.addListener(callback);

    adapter.removeListener(callback);
    adapter.onChange('counted');
    expect(callback).not.toHaveBeenCalled();
  });
});