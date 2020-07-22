import Translator, {LanguageData} from '../Translator';
import Factory from './Factory';

describe('Language.Translator.Factory', () => {
  it('Creates translator', () => {
    const factory: Factory = new Factory();
    const data: LanguageData = {'language': 'data'};
    const expectedTranslator: Translator = new Translator(data);

    const translator: Translator = factory.createTranslator(data);
    expect(translator).toEqual(expectedTranslator);
  });
});
