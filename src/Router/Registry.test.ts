import ListenerAdapter from '../Observer/ListenerAdapter';
import {IObserver} from '../Observer/Observer';
import Registry from './Registry';
import {IPageData} from './Router';

describe('Router.Registry', () => {
  let observer: IObserver<IPageData>, adapter: ListenerAdapter<IPageData>;

  beforeEach(() => {
    adapter = new ListenerAdapter<IPageData>();
    adapter.addListener = jest.fn();
    observer = {
      value: {
        depth: 1,
        name: 'hello',
        url: './hello/page.html'
      },
      adapter: adapter
    };
  });

  it('Change url of page at register', () => {
    const page: IPageData = {
      depth: 1,
      name: 'page',
      url: './page/'
    };

    observer.value = {
      depth: 3,
      name: 'old',
      url: './this/is/old/'
    };

    const registry: Registry = new Registry(observer, adapter);
    registry.registerPage(page);

    expect(page.url).toBe('../../../page/');
    expect(registry.getPages()).toEqual({'page': page});
  });

  it('Update pages', () => {
    let callback: Function = jest.fn();
    const listenerSpy: jest.Mock = adapter.addListener as jest.Mock;
    listenerSpy.mockImplementation((handler) => callback = handler);

    const page: IPageData = {
      depth: 1,
      name: 'page',
      url: './page/'
    };
    const newPage: IPageData = {
      depth: 1,
      name: 'newPage',
      url: './new/page.html'
    };

    observer.value = {
      depth: 3,
      name: 'old',
      url: './this/is/old/'
    };

    const registry: Registry = new Registry(observer, adapter);
    registry.registerPage(page);
    registry.registerPage(newPage);

    expect(page.url).toBe('../../../page/');
    expect(newPage.url).toBe('../../../new/page.html');

    callback(observer.value, newPage);
    expect(page.url).toBe('../page/');
    expect(newPage.url).toBe('./page.html');

    callback(observer.value, page);
    expect(page.url).toBe('./');
    expect(newPage.url).toBe('../new/page.html');

  });

});