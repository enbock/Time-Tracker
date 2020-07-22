import {PageData} from '@enbock/application-router/Router';
import {Observer} from '@enbock/state-value-observer/ValueObserver';
import StyleUrlFormatter from './StyleUrlFormatter';

describe('Application.ThemePresenter', () => {
  let observer: Observer<PageData | null>;

  beforeEach(() => {
    observer = {} as Observer<PageData | null>;
  });

  it('format style url when current page is on sub directory', () => {
    observer.value = {
      baseUrl: './main/page/rootUrl',
      name: 'name',
      currentUrl: 'url'
    };

    expect(new StyleUrlFormatter(observer).format('test')).toEqual('../../Style/test.css');
  });

  it('format style url current page is on root directory', () => {
    observer.value = {
      baseUrl: 'rootUrl',
      name: 'name',
      currentUrl: 'url'
    };

    expect(new StyleUrlFormatter(observer).format('test')).toEqual('./Style/test.css');
  });

  it('format without current page', () => {
    observer.value = null;

    expect(new StyleUrlFormatter(observer).format('test')).toEqual('./Style/test.css');
  });
});
