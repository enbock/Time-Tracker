export default class ChangeLanguageSetup {
    constructor(setupObserver, manager) {
        this.setupObserver = setupObserver;
        this.manager = manager;
    }
    async interact(request, response) {
        const languageCode = request.languageCode;
        const translator = await this.manager.getTranslator(languageCode);
        this.setupObserver.value = {
            languageCode: languageCode,
            translator: translator
        };
    }
}
