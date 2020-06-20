import {IObserver} from '../../../Observer/Observer';
import {IPageData} from '../../../Router/Router';
import StyleUrlFormatter from './StyleUrlFormatter';

describe('Application.ThemePresenter', () => {
  let observer: IObserver<IPageData>;

  beforeEach(() => {
    observer = {} as IObserver<IPageData>;
  });

  it('format build in style url on sub directory', () => {
    observer.value = {
      depth: 2,
      name: 'name',
      url: 'url'
    };

    expect(new StyleUrlFormatter(observer).format('test')).toEqual('../../Style/test.css');
  });

  it('format build in style url on root', () => {
    observer.value = {
      depth: 0,
      name: 'name',
      url: 'url'
    };

    expect(new StyleUrlFormatter(observer).format('test',)).toEqual('./Style/test.css');
  });
});
