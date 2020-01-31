import ApplicationModel from '../Model/ApplicationModel';
import ModelFactory from '../Model/ModelFactory';
import ApplicationPresenter from './ApplicationPresenter';

describe('Application.Presenter.ApplicationPresenter', () => {
  let modelFactory: ModelFactory,
    createApplicationModel: jest.MockedFunction<typeof modelFactory.createApplicationModel>;

  beforeEach(() => {
    modelFactory = new ModelFactory();
    modelFactory.createApplicationModel = jest.fn();
    createApplicationModel =
      modelFactory.createApplicationModel as jest.MockedFunction<typeof modelFactory.createApplicationModel>;
  });

  it('Present application data', () => {
    const presenter = new ApplicationPresenter(modelFactory);
    const viewModel = new ApplicationModel();

    createApplicationModel.mockReturnValueOnce(viewModel);

    const expectedModel = new ApplicationModel();
    expectedModel.text = 'test, which has a presenter and need language manager';

    const result = presenter.present('test');
    expect(result).toBe(viewModel);
    expect(result).toEqual(expectedModel);
  });
});