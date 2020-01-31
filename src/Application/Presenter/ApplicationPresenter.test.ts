import Translator from '../../Language/Translator';
import ApplicationModel from '../Model/ApplicationModel';
import Factory from '../Model/Factory/Factory';
import ApplicationPresenter from './ApplicationPresenter';

describe('Application.Presenter.ApplicationPresenter', () => {
  let modelFactory: Factory, createApplicationModel: jest.Mock;

  beforeEach(() => {
    modelFactory = new Factory();
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