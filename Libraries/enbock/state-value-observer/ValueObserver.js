export default class ValueObserver {
    constructor(initialValue, adapter) {
        this.current = initialValue;
        this.adapter = adapter;
    }
    get value() {
        return this.current;
    }
    set value(newValue) {
        this.current = newValue;
        this.adapter.onChange(newValue);
    }
}
