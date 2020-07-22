import {Observer} from '@enbock/state-value-observer/ValueObserver';
import ThemesRegistry, {Theme} from './ThemesRegistry';

export default class ThemesManager {
  protected observer: Observer<Theme>;
  protected registry: ThemesRegistry;

  constructor(observer: Observer<Theme>, registry: ThemesRegistry) {
    this.registry = registry;
    this.observer = observer;
  }

  changeTheme(name: string): void {
    this.observer.value = this.registry.getTheme(name);
  }
}
