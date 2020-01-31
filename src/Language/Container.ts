import ListenerAdapter from '../Observer/ListenerAdapter';
import Observer from '../Observer/Observer';
import ChangeLanguageSetup, {ILanguageSetup} from './ChangeLanguageSetup';
import AjaxLoader from './Loader/Ajax';
import Manager from './Manager';
import TranslatorFactory from './Translator/Factory';

class Container {
  translatorFactory: TranslatorFactory;
  loader: AjaxLoader;
  manager: Manager;
  setupAdapter: ListenerAdapter<ILanguageSetup>;
  setupObserver: Observer<ILanguageSetup>;
  changeLanguageSetup: ChangeLanguageSetup;

  constructor() {
    this.translatorFactory = new TranslatorFactory();
    this.loader = new AjaxLoader();
    this.manager = new Manager(this.loader, this.translatorFactory);

    this.setupAdapter = new ListenerAdapter<ILanguageSetup>();
    const languageSetup: ILanguageSetup = {
      languageCode: '', translator: this.translatorFactory.createTranslator({})
    };
    this.setupObserver = new Observer<ILanguageSetup>(languageSetup, this.setupAdapter);
    this.changeLanguageSetup = new ChangeLanguageSetup(this.setupObserver, this.manager);
  }
}

export default new Container();