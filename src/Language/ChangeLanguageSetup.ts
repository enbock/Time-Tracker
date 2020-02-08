import {IObserver} from '../Observer/Observer';
import Manager from './Manager';
import Translator from './Translator';

interface IRequest {
  languageCode: string;
}

interface IResponse {
}

export interface ILanguageSetup {
  languageCode: string
  translator: Translator
}

export default class ChangeLanguageSetup {
  protected observer: IObserver<ILanguageSetup>;
  protected manager: Manager;

  constructor(observer: IObserver<ILanguageSetup>, manager: Manager) {
    this.observer = observer;
    this.manager = manager;
  }

  async interact(request: IRequest, response: IResponse): Promise<void> {
    const languageCode: string = request.languageCode;
    const translator: Translator = await this.manager.getTranslator(languageCode);

    this.observer.value = {
      languageCode: languageCode,
      translator: translator
    };
  }
}