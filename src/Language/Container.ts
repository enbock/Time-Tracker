import ListenerAdapter from '../Observer/ListenerAdapter';
import Observer from '../Observer/Observer';
import DataStorage from '../Storage/DataStorage';
import AjaxLoader from './Loader/Ajax';
import Manager from './Manager';
import ActiveTranslatorAdapter from './Manager/ActiveTranslatorAdapter';
import Translator from './Translator';
import TranslatorFactory from './Translator/Factory';

class Container {
  translatorFactory: TranslatorFactory;
  loader: AjaxLoader;
  manager: Manager;
  adapter: ListenerAdapter<string>;
  observer: Observer<string>;
  activeTranslator: Observer<Translator>;
  activeTranslatorAdapter: ActiveTranslatorAdapter;
  storage: DataStorage;

  constructor() {
    this.storage = new DataStorage('language', window.localStorage);

    this.translatorFactory = new TranslatorFactory();
    this.loader = new AjaxLoader();
    this.manager = new Manager(this.loader, this.translatorFactory);

    this.adapter = new ListenerAdapter<string>();
    this.activeTranslator = new Observer<Translator>(
      new Translator({}),
      {onChange: (oldValue: Translator, newValue: Translator): void => {}}
    );
    this.activeTranslatorAdapter = new ActiveTranslatorAdapter(this.adapter, this.manager, this.activeTranslator);
    this.observer =
      new Observer<string>('', this.storage.attach<string>('languageSetup', this.activeTranslatorAdapter));
  }
}

export default new Container();