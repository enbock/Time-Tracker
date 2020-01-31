import ILoader from '../ILoader';

export default class Ajax implements ILoader {
  async loadLanguage(languageCode: string) {
    const response = await fetch('../I18n/' + languageCode + '.json');

    return response.json();
  }
}