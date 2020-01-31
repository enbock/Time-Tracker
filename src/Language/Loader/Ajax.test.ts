import Ajax from './Ajax';

describe('Language.Loader.Ajax', () => {
  it('Load json file', async () => {
    const data: Object = {lang: 'loaded'};
    const mockJsonPromise: Promise<any> = Promise.resolve(data);
    const mockFetchPromise: Promise<any> = Promise.resolve({json: () => mockJsonPromise});
    const fetchSpy = window.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const loader = new Ajax();
    const loaded = await loader.loadLanguage('de-de');

    expect(fetchSpy).toHaveBeenCalledWith('./I18n/de-de.json');
    expect(loaded).toBe(data);

    delete (window.fetch);
  });
});