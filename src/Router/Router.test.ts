import {IObserver} from '../Observer/Observer';
import Router, {IPageData} from './Router';

describe('Router', () => {
  let window: Window, history: History, pageObserver: IObserver<IPageData>;

  beforeEach(() => {
    // @ts-ignore
    window = {addEventListener: jest.fn()};
    // @ts-ignore
    history =
      {
        pushState: jest.fn(),
        replaceState: jest.fn()
      };
    pageObserver = {
      value: {
        depth: 1,
        name: 'hello',
        url: './hello/page.html'
      },
      adapter: {onChange: jest.fn()}
    };
  });

  it('Attach to window event', (done) => {
    const listenerSpy: jest.Mock = window.addEventListener as jest.Mock;

    listenerSpy.mockImplementation((type: string, callback: Function) => {
      expect(type).toBe('popstate');
      expect(callback).toBeInstanceOf(Function);

      done();
    });

    const router: Router = new Router(pageObserver, history);
    router.attachTo(window);
  });

  it('Change current page on history update', () => {
    const listenerSpy: jest.Mock = window.addEventListener as jest.Mock;
    let eventHandler: Function = jest.fn();
    listenerSpy.mockImplementation((type: string, callback: Function) => eventHandler = callback);

    const router: Router = new Router(pageObserver, history);
    router.attachTo(window);
    const oldPage: IPageData = {
      depth: 1,
      name: 'before',
      url: './before/page.html'
    };
    const event: PopStateEvent = new PopStateEvent('popstate', {state: oldPage});
    eventHandler(event);
    expect(pageObserver.value).toBe(oldPage);
  });

  it('Initialize first page', () => {
    const router: Router = new Router(pageObserver, history);
    const firstPage: IPageData = {
      depth: 0,
      name: 'first',
      url: './new/page.html'
    };

    router.initialize(firstPage);
    expect(pageObserver.value).toBe(firstPage);
    expect(history.replaceState).toBeCalledWith(firstPage, 'first', './new/page.html');
  });

  it('Change to a new page', () => {
    const router: Router = new Router(pageObserver, history);
    const newPage: IPageData = {
      depth: 1,
      name: 'new',
      url: './new/page.html'
    };

    router.changePage(newPage);
    expect(pageObserver.value).toBe(newPage);
    expect(history.pushState).toBeCalledWith(newPage, 'new', './new/page.html');
    expect(history.pushState).toBeCalledTimes(1);

    router.changePage(newPage);
    expect(history.pushState).toBeCalledTimes(1);
  });

});