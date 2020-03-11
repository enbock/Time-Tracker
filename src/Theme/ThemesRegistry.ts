export interface Theme {
  name: string,
  isBuildIn: boolean,
  url: string
}

interface ThemesDictionary {
  [name: string]: Theme
}

export default class ThemesRegistry {
  protected registeredThemes: ThemesDictionary;

  constructor() {
    this.registeredThemes = {};
  }

  registerTheme(theme: Theme) {
    this.registeredThemes[theme.name] = theme;
  }

  getTheme(name: string): Theme {
    return this.registeredThemes[name] ||
      {
        name: 'Unknown',
        isBuildIn: true,
        url: 'Themes/Unknown'
      };
  }
}