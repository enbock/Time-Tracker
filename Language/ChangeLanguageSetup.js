export default class ChangeLanguageSetup {
    constructor(observer, manager) {
        this.observer = observer;
        this.manager = manager;
    }
    async interact(request, response) {
        const languageCode = request.languageCode;
        const translator = await this.manager.getTranslator(languageCode);
        this.observer.value = {
            languageCode: languageCode,
            translator: translator
        };
    }
}
