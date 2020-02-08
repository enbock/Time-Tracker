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
  adapter: ListenerAdapter<ILanguageSetup>;
  observer: Observer<ILanguageSetup>;
  changeLanguageSetup: ChangeLanguageSetup;

  constructor() {
    this.translatorFactory = new TranslatorFactory();
    this.loader = new AjaxLoader();
    this.manager = new Manager(this.loader, this.translatorFactory);

    this.adapter = new ListenerAdapter<ILanguageSetup>();
    const initialLanguageSetup: ILanguageSetup = {
      languageCode: '',
      translator: this.translatorFactory.createTranslator({})
    };
    this.observer = new Observer<ILanguageSetup>(initialLanguageSetup, this.adapter);
    this.changeLanguageSetup = new ChangeLanguageSetup(this.observer, this.manager);
  }
}

export default new Container();