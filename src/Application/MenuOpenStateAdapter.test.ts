import MenuOpenStateAdapter from './MenuOpenStateAdapter';

describe(MenuOpenStateAdapter, function (): void {
  it('Just remember last state', function (): void {
    (new MenuOpenStateAdapter()).onChange(true);
  });
});
