export default class ThemesManager {
    constructor(observer, registry) {
        this.registry = registry;
        this.observer = observer;
    }
    changeTheme(name) {
        this.observer.value = this.registry.getTheme(name);
    }
}
