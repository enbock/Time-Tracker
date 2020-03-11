import {IObserver} from '../../../Observer/Observer';
import {Theme} from '../../../Theme/ThemesRegistry';
import ThemeModel from './ThemeModel';

export default class ThemePresenter {
  protected observer: IObserver<Theme>;

  constructor(observer: IObserver<Theme>) {
    this.observer = observer;
  }

  present(): ThemeModel {
    const currentTheme: Theme = this.observer.value;
    const view: ThemeModel = new ThemeModel();

    view.external = !currentTheme.isBuildIn;
    view.source = currentTheme.url;

    return view;
  }
}