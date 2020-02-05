import {IObserver} from '../Observer/Observer';
import ChangeLanguageSetup, {ILanguageSetup} from './ChangeLanguageSetup';
import Manager from './Manager';
import Translator from './Translator';

describe('Language.ChangeLanguageSetup', () => {
  it('Loads and setup new language', async () => {
    const translator1: Translator = new Translator({});
    const translator2: Translator = new Translator({translator: 'two'});
    const initialValue: ILanguageSetup = {
      languageCode: '',
      translator: translator1
    };
    const observer: IObserver<ILanguageSetup> = {value: initialValue};
    const manager: Manager = new Manager({loadLanguage: jest.fn()}, {createTranslator: jest.fn()});

    const getTranslatorSpy: jest.Mock = manager.getTranslator = jest.fn();
    getTranslatorSpy.mockResolvedValue(translator2);
    const expectedSetup: ILanguageSetup = {
      languageCode: 'de-de',
      translator: translator2
    };

    const interactor: ChangeLanguageSetup = new ChangeLanguageSetup(observer, manager);
    await interactor.interact({languageCode: 'de-de'}, {});

    expect(observer.value).toEqual(expectedSetup);
  });
});