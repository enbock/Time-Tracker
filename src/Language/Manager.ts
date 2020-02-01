import ILoader from './ILoader';
import Translator from './Translator';
import TranslatorFactory from './Translator/Factory';

interface ITranslators {
  [languageCode: string]: Translator;
}

export default class Manager {
  protected loader: ILoader;
  protected translators: ITranslators;
  protected translatorFactory: TranslatorFactory;

  constructor(loader: ILoader, translatorFactory: TranslatorFactory) {
    this.loader = loader;
    this.translatorFactory = translatorFactory;
    this.translators = {}
  }

  public async getTranslator(languageCode: string) {
    if (this.translators.hasOwnProperty(languageCode)) {
      return this.translators[languageCode];
    }

    const languageData = await this.loader.loadLanguage(languageCode);
    const translator = this.translatorFactory.createTranslator(languageData);
    this.translators[languageCode] = translator;

    return translator;
  }
}