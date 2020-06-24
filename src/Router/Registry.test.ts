import ListenerAdapter from '../Observer/ListenerAdapter';
import {IObserver} from '../Observer/Observer';
import Registry from './Registry';
import {IPageData} from './Router';

describe('Router.Registry', () => {
  let observer: IObserver<IPageData | null>, adapter: ListenerAdapter<IPageData>;

  beforeEach(() => {
    adapter = new ListenerAdapter<IPageData>();
    adapter.addListener = jest.fn();
    observer = {
      value: {
        depth: 1,
        name: 'hello',
        rootUrl: './hello/page.html',
        url: './hello/page.html'
      },
      adapter: adapter
    };
  });

  it('Change url of page at register', () => {
    const page: IPageData = {
      depth: 1,
      name: 'page',
      rootUrl: './page/',
      url: './page/'
    };

    observer.value = {
      depth: 3,
      name: 'old',
      rootUrl: './this/is/old/',
      url: './this/is/old/'
    };

    const registry: Registry = new Registry(observer);
    registry.registerPage(page);

    expect(page.rootUrl).toBe('./page/');
    expect(page.url).toBe('../../../page/');
    expect(registry.getPages()).toEqual({'page': page});
  });

  it('Change url of page at register without current page', () => {
    const page: IPageData = {
      depth: 1,
      name: 'page',
      rootUrl: './page/',
      url: './page/'
    };

    observer.value = null;

    const registry: Registry = new Registry(observer);
    registry.registerPage(page);

    expect(page.rootUrl).toBe('./page/');
    expect(page.url).toBe('./page/');
    expect(registry.getPages()).toEqual({'page': page});
  });

  it('Update pages', () => {
    let callback: Function = jest.fn();
    const listenerSpy: jest.Mock = adapter.addListener as jest.Mock;
    listenerSpy.mockImplementation((handler) => callback = handler);

    const page: IPageData = {
      depth: 1,
      name: 'page',
      rootUrl: './page/',
      url: './page/'
    };
    const newPage: IPageData = {
      depth: 1,
      name: 'newPage',
      rootUrl: './new/page.html',
      url: './new/page.html'
    };

    observer.value = {
      depth: 3,
      name: 'old',
      rootUrl: './this/is/old/',
      url: './this/is/old/'
    };

    const registry: Registry = new Registry(observer);
    registry.attachAdapter(adapter);
    registry.registerPage(page);
    registry.registerPage(newPage);

    expect(page.url).toBe('../../../page/');
    expect(newPage.url).toBe('../../../new/page.html');

    callback(newPage);
    expect(page.url).toBe('../page/');
    expect(newPage.url).toBe('./page.html');

    callback(page);
    expect(page.url).toBe('./');
    expect(newPage.rootUrl).toBe('./new/page.html');
    expect(newPage.url).toBe('../new/page.html');

  });

});
