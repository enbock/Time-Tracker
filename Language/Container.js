import ListenerAdapter from "../Observer/ListenerAdapter.js";
import Observer from "../Observer/Observer.js";
import ChangeLanguageSetup from "./ChangeLanguageSetup.js";
import AjaxLoader from "./Loader/Ajax.js";
import Manager from "./Manager.js";
import TranslatorFactory from "./Translator/Factory.js";
class Container {
    constructor() {
        this.translatorFactory = new TranslatorFactory();
        this.loader = new AjaxLoader();
        this.manager = new Manager(this.loader, this.translatorFactory);
        this.adapter = new ListenerAdapter();
        const initialLanguageSetup = {
            languageCode: '',
            translator: this.translatorFactory.createTranslator({})
        };
        this.observer = new Observer(initialLanguageSetup, this.adapter);
        this.changeLanguageSetup = new ChangeLanguageSetup(this.observer, this.manager);
    }
}
export default new Container();
