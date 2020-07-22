import DataStorage from "../Libraries/enbock/simple-storage/DataStorage.js";
import ListenerAdapter from "../Libraries/enbock/state-value-observer/ListenerAdapter.js";
import ValueObserver from "../Libraries/enbock/state-value-observer/ValueObserver.js";
import ThemesManager from "./ThemesManager.js";
import ThemesRegistry from "./ThemesRegistry.js";
class Container {
    constructor() {
        this.storage = new DataStorage('theme', window.localStorage);
        this.registry = new ThemesRegistry();
        this.currentThemeAdapter = new ListenerAdapter();
        this.currentTheme = new ValueObserver(this.storage.loadData('currentTheme', {
            isBuildIn: true,
            name: 'Google',
            url: 'Theme/Google'
        }), this.storage.attach('currentTheme', this.currentThemeAdapter));
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
    }
}
export default new Container();
