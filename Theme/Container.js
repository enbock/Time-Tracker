import ListenerAdapter from "../Observer/ListenerAdapter.js";
import Observer from "../Observer/Observer.js";
import ThemesManager from "./ThemesManager.js";
import ThemesRegistry from "./ThemesRegistry.js";
class Container {
    constructor() {
        this.registry = new ThemesRegistry();
        this.currentThemeAdapter = new ListenerAdapter();
        this.currentTheme = new Observer(this.registry.getTheme('unknown'), this.currentThemeAdapter);
        this.manager = new ThemesManager(this.currentTheme, this.registry);
        this.setupDefaults();
    }
    setupDefaults() {
        this.registry.registerTheme({
            isBuildIn: true,
            name: 'Google',
            url: 'Theme/Google'
        });
        this.registry.registerTheme({
            isBuildIn: true,
            name: 'Codefrog',
            url: 'Theme/Codefrog'
        });
        this.manager.changeTheme('Google');
    }
}
export default new Container();
