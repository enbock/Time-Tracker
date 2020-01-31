import Translator, {ILanguageData} from '../Translator';
import Factory from './Factory';

describe('Language.Translator.Factory', () => {
  it('Creates translator', () => {
    const factory: Factory = new Factory();
    const data: ILanguageData = {'language': 'data'};
    const expectedTranslator: Translator = new Translator(data);

    const translator: Translator = factory.createTranslator(data);
    expect(translator).toEqual(expectedTranslator);
  });
});