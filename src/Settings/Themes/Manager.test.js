import Manager from './Manager';

describe('Themes Manager', function testThemesManager() {
  it('Initial style', function testInitialState(done) {
    const manager = new Manager({'test': 'Test.css', 'test2': 'Test2.css'});
    expect(manager.activeTheme).toBe('test');
    expect(manager.themeFile).toBe('Test.css');

    // TODO Legacy
    const adapter = {
      onThemeChange: function (name, file) {
        expect(name).toBe('test');
        expect(file).toBe('Test.css');
        expect(manager.activeTheme).toBe('test');
        expect(manager.themeFile).toBe('Test.css');
        done();
      }
    };
    manager.setAdapter(adapter);
  });

  it('Change style', function testChangeStyle() {
    const manager = new Manager({'test': 'Test.css', 'test2': 'Test2.css'});

    manager.changeTheme('notExists');
    expect(manager.activeTheme).toBe('test');
    expect(manager.themeFile).toBe('Test.css');

    manager.changeTheme('test2');
    expect(manager.activeTheme).toBe('test2');
    expect(manager.themeFile).toBe('Test2.css');
  });
});
