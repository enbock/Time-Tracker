export default class Manager {
    constructor(loader, translatorFactory) {
        this.loader = loader;
        this.translatorFactory = translatorFactory;
        this.translators = {};
    }
    async getTranslator(languageCode) {
        if (this.translators.hasOwnProperty(languageCode)) {
            return this.translators[languageCode];
        }
        const languageData = await this.loader.loadLanguage(languageCode);
        const translator = this.translatorFactory.createTranslator(languageData);
        this.translators[languageCode] = translator;
        return translator;
    }
}
