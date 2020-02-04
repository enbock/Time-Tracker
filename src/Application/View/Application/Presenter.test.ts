import Translator from '../../../Language/Translator';
import TopBarModel from '../TopBar/Model';
import TopBarPresenter from '../TopBar/Presenter';
import Model from './Model';
import Presenter from './Presenter';

describe('Application.Presenter.ApplicationPresenter', () => {
  let topAppBarPresenter: TopBarPresenter, presentSpy: jest.Mock;

  beforeEach(() => {
    topAppBarPresenter = new TopBarPresenter({value: {translator: new Translator({}), languageCode: ''}});
    presentSpy = topAppBarPresenter.present = jest.fn();
  });

  it('Present application data', () => {
    const translator: Translator = new Translator({});
    const presenter: Presenter = new Presenter({value: {translator: translator, languageCode: ''}}, topAppBarPresenter);
    const translateSpy: jest.Mock = translator.translate = jest.fn();
    const topAppBarModel: TopBarModel = new TopBarModel();
    topAppBarModel.title = 'top title';

    translateSpy.mockReturnValueOnce('translated text');
    presentSpy.mockReturnValueOnce(topAppBarModel);

    const expectedModel: Model = new Model();
    expectedModel.text = 'test translated text';
    expectedModel.topAppBar = topAppBarModel;

    const result = presenter.present('test ');
    expect(translateSpy).toHaveBeenCalledWith('Application.Test');
    expect(result).toEqual(expectedModel);
  });
});