import ListenerAdapter from './ListenerAdapter';
import {IOnChangeCallback} from './Observer';

describe('Observer.ListenerAdapter', () => {
  it('registers and call on change', () => {
    const callback: IOnChangeCallback<string> = jest.fn();
    const adapter: ListenerAdapter<string> = new ListenerAdapter<string>();

    adapter.addListener(callback);
    adapter.onChange('old', 'new');
    expect(callback).toHaveBeenCalledWith('old', 'new');
  });

  it('removes listener', () => {
    const callback: IOnChangeCallback<string> = jest.fn();
    const adapter: ListenerAdapter<string> = new ListenerAdapter<string>();
    adapter.addListener(callback);

    adapter.removeListener(callback);
    adapter.onChange('not', 'counted');
    expect(callback).not.toHaveBeenCalled();
  })
});