import ListenerAdapter from "../Observer/ListenerAdapter.js";
import Observer from "../Observer/Observer.js";
import DataStorage from "../Storage/DataStorage.js";
import AjaxLoader from "./Loader/Ajax.js";
import Manager from "./Manager.js";
import ActiveTranslatorAdapter from "./Manager/ActiveTranslatorAdapter.js";
import Translator from "./Translator.js";
import TranslatorFactory from "./Translator/Factory.js";
class Container {
    constructor() {
        this.storage = new DataStorage('language', window.localStorage);
        this.translatorFactory = new TranslatorFactory();
        this.loader = new AjaxLoader();
        this.manager = new Manager(this.loader, this.translatorFactory);
        this.adapter = new ListenerAdapter();
        this.activeTranslator = new Observer(new Translator({}), { onChange: (newValue) => { } });
        this.activeTranslatorAdapter = new ActiveTranslatorAdapter(this.adapter, this.manager, this.activeTranslator);
        this.observer =
            new Observer('', this.storage.attach('languageSetup', this.activeTranslatorAdapter));
        this.setupDefaults();
    }
    setupDefaults() {
        this.observer.value = this.storage.loadData('languageSetup', 'de-de');
    }
}
export default new Container();
