/** global: jest */

import {shallow} from 'enzyme';
import React from 'react';
import Settings from './Settings';
import View from './View';

jest.mock('react-dom');

describe('Settings Page', function testSettings() {
  let templateLoader;

  beforeEach(function setup() {
    templateLoader = {
      loadTemplate: jest.fn().mockImplementation(template => {
        return Promise.resolve(() => <div>JSX</div>);
      })
    };
  });

  it('Change language', function () {
    const themeChangeInteractor = {
      interact: jest.fn()
    };
    const languageChangeInteractor = {
      interact: jest.fn(
        /**
         * @param {Request}request
         * @param {Response} response
         */
        (request, response) => {
          response.isChanged = true;
        }
      )
    };

    const settingsPresenter = {present: jest.fn().mockReturnValue(new View())};

    const wrapper = shallow(<Settings
      template="template"
      templateLoader={templateLoader}
      settingsPresenter={settingsPresenter}
      themeChangeInteractor={themeChangeInteractor}
      languageChangeInteractor={languageChangeInteractor}
    />);

    let instance = wrapper.instance();

    instance.onSelectionChange(
      {
        name: 'dummy'
      }
    );
    instance.onSelectionChange(
      {
        name: 'language',
        selectedOptions: ['de_DE'],
        selectedIndex: 1,
        value: 'de_DE'
      }
    );

    expect(languageChangeInteractor.interact).toHaveBeenCalledTimes(1);
    expect(languageChangeInteractor.interact.mock.calls[0][0].newLanguage).toBe('de_DE');
  });

  it('Change activeTheme', function () {
    const themeChangeInteractor = {
      interact: jest.fn(
        /**
         * @param {Request}request
         * @param {Response} response
         */
        (request, response) => {
          response.theme = 'theme';
          response.file = 'file';
          response.isChanged = true;
        }
      )
    };
    const languageChangeInteractor = {
      interact: jest.fn()
    };

    const settingsPresenter = {present: jest.fn().mockReturnValue(new View())};

    const wrapper = shallow(<Settings
      template="template"
      templateLoader={templateLoader}
      settingsPresenter={settingsPresenter}
      themeChangeInteractor={themeChangeInteractor}
      languageChangeInteractor={languageChangeInteractor}
    />);

    let instance = wrapper.instance();

    instance.onSelectionChange(
      {
        name: 'dummy'
      }
    );
    instance.onSelectionChange(
      {
        name: 'color',
        selectedOptions: ['google'],
        selectedIndex: 1,
        value: 'google'
      }
    );

    expect(themeChangeInteractor.interact).toHaveBeenCalledTimes(1);
    expect(themeChangeInteractor.interact.mock.calls[0][0].newTheme).toBe('google');
  });
});
