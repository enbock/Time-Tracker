import Observer from '../Observer/Observer';
import ChangeLanguageSetup from './ChangeLanguageSetup';
import Container from './Container';
import Manager from './Manager';

describe('Language.Container', () => {
  it('Get shared objects', () => {
    expect(Container.manager).toBeInstanceOf(Manager);
    expect(Container.setupObserver).toBeInstanceOf(Observer);
    expect(Container.changeLanguageSetup).toBeInstanceOf(ChangeLanguageSetup);
  });
});