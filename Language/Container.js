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
        this.setupAdapter = new ListenerAdapter();
        const languageSetup = {
            languageCode: '',
            translator: this.translatorFactory.createTranslator({})
        };
        this.setupObserver = new Observer(languageSetup, this.setupAdapter);
        this.changeLanguageSetup = new ChangeLanguageSetup(this.setupObserver, this.manager);
    }
}
export default new Container();
