import DataStorage from '@enbock/simple-storage/DataStorage';
import ListenerAdapter from '@enbock/state-value-observer/ListenerAdapter';
import ValueObserver from '@enbock/state-value-observer/ValueObserver';
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
  observer: ValueObserver<string>;
  activeTranslator: ValueObserver<Translator>;
  activeTranslatorAdapter: ActiveTranslatorAdapter;
  storage: DataStorage;

  constructor() {
    this.storage = new DataStorage('language', window.localStorage);

    this.translatorFactory = new TranslatorFactory();
    this.loader = new AjaxLoader();
    this.manager = new Manager(this.loader, this.translatorFactory);

    this.adapter = new ListenerAdapter<string>();
    this.activeTranslator = new ValueObserver<Translator>(
      new Translator({}),
      {onChange: (newValue: Translator): void => {}}
    );
    this.activeTranslatorAdapter = new ActiveTranslatorAdapter(this.adapter, this.manager, this.activeTranslator);
    this.observer =
      new ValueObserver<string>('', this.storage.attach<string>('languageSetup', this.activeTranslatorAdapter));

    this.setupDefaults();
  }

  protected setupDefaults(): void {
    this.observer.value = this.storage.loadData<string>('languageSetup', 'de-de');
  }
}

export default new Container();
