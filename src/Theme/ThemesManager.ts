import {IObserver} from '../Observer/Observer';
import ThemesRegistry, {Theme} from './ThemesRegistry';

export default class ThemesManager {
  protected observer: IObserver<Theme>;
  protected registry: ThemesRegistry;

  constructor(observer: IObserver<Theme>, registry: ThemesRegistry) {
    this.registry = registry;
    this.observer = observer;
  }

  changeTheme(name: string) {
    this.observer.value = this.registry.getTheme(name);
  }
}