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
  protected setupObserver: IObserver<ILanguageSetup>;
  protected manager: Manager;

  constructor(setupObserver: IObserver<ILanguageSetup>, manager: Manager) {
    this.setupObserver = setupObserver;
    this.manager = manager;
  }

  async interact(request: IRequest, response: IResponse): Promise<void> {
    const languageCode: string = request.languageCode;
    const translator: Translator = await this.manager.getTranslator(languageCode);

    this.setupObserver.value = {languageCode: languageCode, translator: translator};
  }
}