import Loader from './Loader';
import Translator from './Translator';
import TranslatorFactory from './Translator/Factory';

interface Translators {
  [languageCode: string]: Translator;
}

export default class Manager {
  protected loader: Loader;
  protected translators: Translators;
  protected translatorFactory: TranslatorFactory;

  constructor(loader: Loader, translatorFactory: TranslatorFactory) {
    this.loader = loader;
    this.translatorFactory = translatorFactory;
    this.translators = {};
  }

  async getTranslator(languageCode: string): Promise<Translator> {
    if (this.translators.hasOwnProperty(languageCode)) {
      return this.translators[languageCode];
    }

    const languageData = await this.loader.loadLanguage(languageCode);
    const translator: Translator = this.translatorFactory.createTranslator(languageData);
    this.translators[languageCode] = translator;

    return translator;
  }
}
