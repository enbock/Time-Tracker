import {render} from '@testing-library/react'
import React from 'react';
import Application from './Application';
import Container from './Container';
import ApplicationModel from './Model/ApplicationModel';

jest.mock('./Container', () => ({applicationPresenter: {present: jest.fn()}}));
jest.mock('./View/ApplicationView', () => (props: any) => <div data-testid="output">{props.model.text}</div>);

describe('Application.Application', () => {
  let present: jest.MockedFunction<typeof Container.applicationPresenter.present>;

  beforeEach(() => {
    const presenter = Container.applicationPresenter;
    present = presenter.present as jest.MockedFunction<typeof presenter.present>;
    present.mockReset();
  });

  it('Can start', async () => {
    const model = new ApplicationModel();
    model.text = 'labelText';
    present.mockReturnValueOnce(model);
    const instance = render(<Application />);

    expect((await instance.findByTestId('output')).textContent).toBe(model.text);
  });
});