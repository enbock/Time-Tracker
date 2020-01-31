export interface IValueMap {
  [pattern: string]: string
}

export interface ILanguageData {
  [key: string]: string
}

export default class Translator {
  language: ILanguageData;

  constructor(languageData: ILanguageData) {
    this.language = languageData;
  }

  public translate(key: string, valueMap: IValueMap = {}) {
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