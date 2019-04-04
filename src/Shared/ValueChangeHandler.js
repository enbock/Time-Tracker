import emptyFunction from 'fbjs/lib/emptyFunction';

export default class ValueChangeHandler {
  /**
   * @param {*} defaultValue
   */
  constructor(defaultValue) {
    this.value = defaultValue;
    this.registeredReceivers = [];
  }

  /**
   * @returns {Object}
   */
  static get defaultAdapter() {
    return {onChange: emptyFunction};
  };

  /**
   * @param {*} newValue
   */
  setValue(newValue) {
    this.value = newValue;
    this.registeredReceivers.forEach(adapter => adapter.onChange(newValue));
  }

  /**
   * @param {Object} adapter
   */
  registerReceiver(adapter) {
    this.deregisterReceiver(adapter);
    this.registeredReceivers.push(adapter);
    adapter.onChange(this.value);
  }

  /**
   * @param {Object} adapter
   */
  deregisterReceiver(adapter) {
    const index = this.registeredReceivers.indexOf(adapter);
    if (index === -1) return;
    this.registeredReceivers.splice(index, 1);
  }
}
