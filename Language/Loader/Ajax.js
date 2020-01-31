export default class Ajax {
    async loadLanguage(languageCode) {
        const response = await fetch('./I18n/' + languageCode + '.json');
        return response.json();
    }
}
