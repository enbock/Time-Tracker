import RegisterManager from './RegisterManager';

describe('Menu Register Manager', function testRegisterManager() {
  it('Handle toggle', function testToggleHandling() {
    const handler = jest.fn();
    const manager = new RegisterManager();

    manager.registerMenuToggleHandler(handler);
    manager.registerMenuToggleHandler(handler);

    expect(manager.toggleHandler).toEqual([handler]);
    manager.toggle();
    expect(handler).toHaveBeenCalledTimes(1);

    manager.deregisterMenuToggleHandler(handler);
    manager.deregisterMenuToggleHandler(handler);
    expect(manager.toggleHandler.length).toBe(0);
  });

  it('Handle change', function testToggleHandling() {
    const handler = jest.fn();
    const manager = new RegisterManager();

    manager.registerMenuChangeHandler(handler);
    manager.registerMenuChangeHandler(handler);

    expect(manager.changeHandler).toEqual([handler]);
    manager.change('menuId');
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith('menuId');

    manager.deregisterMenuChangeHandler(handler);
    manager.deregisterMenuChangeHandler(handler);
    expect(manager.changeHandler.length).toBe(0);
  });
});
