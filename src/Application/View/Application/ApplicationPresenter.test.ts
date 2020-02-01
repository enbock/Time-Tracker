import Translator from '../../../Language/Translator';
import ModelFactory from '../ModelFactory';
import ApplicationModel from './ApplicationModel';
import ApplicationPresenter from './ApplicationPresenter';

describe('Application.Presenter.ApplicationPresenter', () => {
  let modelFactory: ModelFactory, createApplicationModel: jest.Mock;

  beforeEach(() => {
    modelFactory = new ModelFactory();
    createApplicationModel = modelFactory.createApplicationModel = jest.fn();
  });

  it('Present application data', () => {
    const translator: Translator = new Translator({});
    const presenter: ApplicationPresenter = new ApplicationPresenter(modelFactory,
      {value: {translator: translator, languageCode: ''}}
    );
    const translateSpy: jest.Mock = translator.translate = jest.fn();
    const viewModel = new ApplicationModel();

    createApplicationModel.mockReturnValueOnce(viewModel);
    translateSpy.mockReturnValueOnce('translated text');

    const expectedModel = new ApplicationModel();
    expectedModel.text = 'test translated text';

    const result = presenter.present('test ');
    expect(translateSpy).toHaveBeenCalledWith('Application.Test');
    expect(result).toBe(viewModel);
    expect(result).toEqual(expectedModel);
  });
});