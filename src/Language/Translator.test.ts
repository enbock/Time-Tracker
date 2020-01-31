import Translator from './Translator';

describe('Language.Translator', () => {
  it('Translate missing entries to key', () => {
    const translator: Translator = new Translator({});
    expect(translator.translate('test.one')).toEqual('test.one');
  });

  it('Translate entries to label', () => {
    const translator: Translator = new Translator({'test.one': 'label'});
    expect(translator.translate('test.one')).toEqual('label');
  });

  it('Translate entries with dynamic parts', () => {
    const translator: Translator = new Translator({'test.one': 'a {part} label and {part}'});
    expect(translator.translate('test.one', {part: 'entry'})).toEqual('a entry label and entry');
  });
});