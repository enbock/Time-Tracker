import Translator from "../Translator.js";
export default class Factory {
    createTranslator(languageData) {
        return new Translator(languageData);
    }
}
