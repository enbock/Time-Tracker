import {ILanguageSetup} from '../../../Language/ChangeLanguageSetup';
import Translator from '../../../Language/Translator';
import {IObserver} from '../../../Observer/Observer';
import Model from './Model';

export default class Presenter {
  languageSetupObserver: IObserver<ILanguageSetup>;

  constructor(languageSetupObserver: IObserver<ILanguageSetup>) {
    this.languageSetupObserver = languageSetupObserver;
  }

  present(): Model {
    const model: Model = new Model();
    const translator: Translator = this.languageSetupObserver.value.translator;
    model.title = translator.translate('Application.TopBar.Title');

    return model;
  }
}