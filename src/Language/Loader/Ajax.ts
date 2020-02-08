import Loader from '../Loader';

export default class Ajax implements Loader {
  async loadLanguage(languageCode: string) {
    const response = await fetch('./I18n/' + languageCode + '.json');

    return response.json();
  }
}