export default class StorageAdapter {
    constructor(baseAdapter, onChangeCallback) {
        this.baseAdapter = baseAdapter;
        this.onChangeCallback = onChangeCallback;
    }
    onChange(newValue) {
        this.onChangeCallback(newValue);
        this.baseAdapter.onChange(newValue);
    }
}
