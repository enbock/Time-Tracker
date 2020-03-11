export default class ThemesRegistry {
    constructor() {
        this.registeredThemes = {};
    }
    registerTheme(theme) {
        this.registeredThemes[theme.name] = theme;
    }
    getTheme(name) {
        return this.registeredThemes[name] ||
            {
                name: 'Unknown',
                isBuildIn: true,
                url: 'Themes/Unknown'
            };
    }
}
