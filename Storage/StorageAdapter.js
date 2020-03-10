export default class StorageAdapter {
    constructor(baseAdapter, onChangeCallback) {
        this.baseAdapter = baseAdapter;
        this.onChangeCallback = onChangeCallback;
    }
    onChange(oldValue, newValue) {
        this.onChangeCallback(oldValue, newValue);
        this.baseAdapter.onChange(oldValue, newValue);
    }
}
