import Loader from './Loader';
import Manager from './Manager';
import Translator, {LanguageData} from './Translator';
import Factory from './Translator/Factory';

describe('Language.Manager', () => {
  let loaderSpy: jest.MockedFunction<(languageCode: string) => Promise<any>>,
    createSpy: jest.MockedFunction<(languageData: LanguageData) => Translator>,
    loader: Loader,
    factory: Factory;

  beforeEach(() => {
    loader = {loadLanguage: jest.fn()};
    factory = new Factory();
    factory.createTranslator = jest.fn();

    loaderSpy = loader.loadLanguage as jest.MockedFunction<typeof loaderSpy>;
    createSpy = factory.createTranslator as jest.MockedFunction<typeof createSpy>;
  });

  it('Loads language', async () => {
    const languageData: LanguageData = {'language': 'data'};
    const translator: Translator = new Translator(languageData);
    loaderSpy.mockResolvedValueOnce(languageData);
    createSpy.mockReturnValueOnce(translator);

    const manager: Manager = new Manager(loader, factory);
    const result: Translator = await manager.getTranslator('de-de');

    expect(result).toBe(translator);
    expect(loaderSpy).toHaveBeenCalledWith('de-de');
    expect(createSpy).toHaveBeenCalledWith(languageData);

  });

  it('Reuse loaded language translator', async () => {
    const languageData: LanguageData = {'language': 'data'};
    const translator: Translator = new Translator(languageData);
    loaderSpy.mockResolvedValueOnce(languageData);
    createSpy.mockReturnValueOnce(translator);

    const manager: Manager = new Manager(loader, factory);
    const result1: Translator = await manager.getTranslator('de-de');
    expect(result1).toBe(translator);
    expect(loaderSpy).toHaveBeenCalledWith('de-de');
    expect(createSpy).toHaveBeenCalledWith(languageData);

    const result2: Translator = await manager.getTranslator('de-de');
    expect(result2).toBe(translator);
    expect(loaderSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledTimes(1);
  });
});
