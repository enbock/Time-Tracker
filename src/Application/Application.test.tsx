import {render} from '@testing-library/react'
import React from 'react';
import Application from './Application';
import Container from './Container';
import ApplicationModel from './Model/ApplicationModel';

jest.mock('./Container', () => ({ModelFactory: {createApplicationModel: jest.fn()}}));
jest.mock('./View/ApplicationView', () => (props: any) => <div data-testid="output">{props.model.text}</div>);

describe('Application.Application', () => {
  let createApplicationModel: jest.MockedFunction<typeof Container.ModelFactory.createApplicationModel>;

  beforeEach(() => {
    const modelFactory = Container.ModelFactory;
    createApplicationModel =
      modelFactory.createApplicationModel as jest.MockedFunction<typeof modelFactory.createApplicationModel>;
    createApplicationModel.mockReset();
  });

  it('Can start', async () => {
    const model = new ApplicationModel();
    createApplicationModel.mockReturnValueOnce(model);
    const instance = render(<Application />);

    expect(model.text).toContain('Application');
    expect((await instance.findByTestId('output')).textContent).toBe(model.text);
  });
});