export default class Translator {
    constructor(languageData) {
        this.language = languageData;
    }
    translate(key, valueMap = {}) {
        if (this.language.hasOwnProperty(key)) {
            let translated = String(this.language[key]);
            for (let pattern in valueMap) {
                translated = translated.replace(new RegExp('{' + pattern + '}', 'g'), valueMap[pattern]);
            }
            return translated;
        }
        return key;
    }
}
