import Translator, {LanguageData} from '../Translator';

export default class Factory {
  createTranslator(languageData: LanguageData) {
    return new Translator(languageData);
  }
}
