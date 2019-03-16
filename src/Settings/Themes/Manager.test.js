import Manager from './Manager';

describe('Themes Manager', function testThemesManager() {
  it('Initial style', function testInitialState(done) {
    const manager = new Manager({'test': 'Test.css', 'test2': 'Test2.css'});
    expect(manager.activeTheme).toBe('test');
    expect(manager.themeFile).toBe('Test.css');

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

  it('Change style', function testChangeStyle(done) {
    const manager = new Manager({'test': 'Test.css', 'test2': 'Test2.css'});
    let counter = 0;
    const adapter = {
      onThemeChange: function (name, file) {
        counter++;
        if(counter < 2) return;
        expect(name).toBe('test2');
        expect(file).toBe('Test2.css');
        expect(manager.activeTheme).toBe('test2');
        expect(manager.themeFile).toBe('Test2.css');
        done();
      }
    };
    manager.setAdapter(adapter);

    manager.changeTheme('notExists');
    expect(manager.activeTheme).toBe('test');
    expect(manager.themeFile).toBe('Test.css');

    manager.changeTheme('test2');
  });
});
