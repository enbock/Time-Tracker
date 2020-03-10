import Translator from '../../../Language/Translator';
import {IObserver} from '../../../Observer/Observer';
import Model from './Model';

export default class Presenter {
  protected translator: IObserver<Translator>;

  constructor(translator: IObserver<Translator>) {
    this.translator = translator;
  }

  present(): Model {
    const model: Model = new Model();
    const translator: Translator = this.translator.value;
    model.title = translator.translate('Application.TopBar.Title');

    return model;
  }
}