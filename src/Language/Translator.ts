export interface ValueMap {
  [pattern: string]: string
}

export interface LanguageData {
  [key: string]: string
}

export default class Translator {
  language: LanguageData;

  constructor(languageData: LanguageData) {
    this.language = languageData;
  }

  public translate(key: string, valueMap: ValueMap = {}) {
    if (this.language.hasOwnProperty(key)) {
      let translated = String(this.language[key]);
      for (let pattern in valueMap) {
        translated = translated.replace(new RegExp('{' + pattern + '}', 'g'), valueMap[pattern]);
      }

      return translated;
    }

    return key;
  }
}
