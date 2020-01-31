import Translator, {ILanguageData} from '../Translator';

export default class Factory {
  createTranslator(languageData: ILanguageData) {
    return new Translator(languageData);
  }
}