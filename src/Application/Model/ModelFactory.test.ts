import ApplicationModel from './ApplicationModel';
import ModelFactory from './ModelFactory';

describe('Application.Model.ModelFactory', () => {
  it('Creates Application (View) Model', () => {
    const model = new ModelFactory().createApplicationModel();

    const expectedModel = new ApplicationModel();
    expect(model).toEqual(expectedModel);
  });
});