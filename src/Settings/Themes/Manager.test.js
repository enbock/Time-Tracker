import Manager from './Manager';

describe('Themes Manager', function testThemesManager() {
  it('Initial style', function () {
    const manager = new Manager({'test': 'Test.css', 'test2': 'Test2.css'});
    expect(manager.activeTheme).toBe('test');
    expect(manager.getThemeFile()).toBe('Test.css');
  });

  it('Change style', function (done) {
    const manager = new Manager({'test': 'Test.css', 'test2': 'Test2.css'});
    let counter = 0;
    const adapter = {
      onThemeChange: function (name, file) {
        if (counter === 0) {
          expect(name).toBe('test');
          expect(file).toBe('Test.css');
        } else {
          expect(name).toBe('test2');
          expect(file).toBe('Test2.css');
          expect(manager.activeTheme).toBe('test2');
          expect(manager.getThemeFile()).toBe('Test2.css');
          done();
        }

        counter++;
      }
    };
    manager.setAdapter(adapter);

    manager.changeTheme('notExists');
    expect(manager.activeTheme).toBe('test');
    expect(manager.getThemeFile()).toBe('Test.css');

    manager.changeTheme('test2');
  });
});
