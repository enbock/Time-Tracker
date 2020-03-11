import {IObserver} from '../../../Observer/Observer';
import {Theme} from '../../../Theme/ThemesRegistry';
import ThemeModel from './ThemeModel';
import ThemePresenter from './ThemePresenter';

describe('Application.ThemePresenter', () => {
  let observer: IObserver<Theme>;

  beforeEach(() => {
    observer = {} as IObserver<Theme>;
  });

  it('present the theme', () => {
    observer.value = {
      name: '',
      url: 'source',
      isBuildIn: true
    };

    const expectedModel: ThemeModel = new ThemeModel();
    expectedModel.external = false;
    expectedModel.source = 'source';

    expect(new ThemePresenter(observer).present()).toEqual(expectedModel);
  });
});