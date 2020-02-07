export default class Observer {
    constructor(initialValue, adapter) {
        this.current = initialValue;
        this.adapter = adapter;
    }
    get value() {
        return this.current;
    }
    set value(newValue) {
        const oldValue = this.value;
        this.current = newValue;
        this.adapter.onChange(oldValue, newValue);
    }
}
