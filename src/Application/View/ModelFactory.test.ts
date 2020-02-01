import ApplicationModel from './Application/ApplicationModel';
import ModelFactory from './ModelFactory';
import TopAppBarModel from './TopAppBar/TopAppBarModel';

describe('Application.Model.Factory', () => {
  it('Creates Application (View) Model', () => {
    const model: ApplicationModel = new ModelFactory().createApplicationModel();

    const expectedModel = new ApplicationModel();
    expect(model).toEqual(expectedModel);
  });

  it('Creates Top App Bar Model', () => {
    const model: TopAppBarModel = new ModelFactory().createTopBarAppModel();

    const expectedModel: TopAppBarModel = new TopAppBarModel();
    expect(model).toEqual(expectedModel);
  });
});