import {IObserver} from '@enbock/state-value-observer/Observer';
import Translator from '../../../Language/Translator';
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
    model.sourceButtonLabel = translator.translate('Application.TopBar.Github');

    return model;
  }
}
