import ApplicationModel from '../ApplicationModel';
import Factory from './Factory';

describe('Application.Model.Factory', () => {
  it('Creates Application (View) Model', () => {
    const model = new Factory().createApplicationModel();

    const expectedModel = new ApplicationModel();
    expect(model).toEqual(expectedModel);
  });
});