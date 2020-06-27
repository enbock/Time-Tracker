import Translator from '../../../Language/Translator';
import Model from './Model';
import Presenter from './Presenter';

describe('Application.Presenter.ApplicationPresenter', () => {
  it('Present application data', () => {
    const translator: Translator = new Translator({});
    const presenter: Presenter = new Presenter({
      value: translator
    });
    const translateSpy: jest.Mock = translator.translate = jest.fn();

    translateSpy.mockReturnValueOnce('title');
    translateSpy.mockReturnValueOnce('github');

    const expectedModel = new Model();
    expectedModel.title = 'title';
    expectedModel.sourceButtonLabel = 'github';

    const result: Model = presenter.present();
    expect(translateSpy).toHaveBeenCalledWith('Application.TopBar.Title');
    expect(translateSpy).toHaveBeenCalledWith('Application.TopBar.Github');
    expect(result).toEqual(expectedModel);
  });
});
