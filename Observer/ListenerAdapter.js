export default class ListenerAdapter {
    constructor() {
        this.listeners = [];
    }
    onChange(oldValue, newValue) {
        function callListener(listener) {
            setTimeout(function handler() {
                listener(oldValue, newValue);
            }, 1);
        }
        this.listeners.forEach(callListener);
    }
    addListener(callback) {
        this.removeListener(callback);
        this.listeners.push(callback);
    }
    removeListener(callback) {
        const index = this.listeners.indexOf(callback);
        if (index < 0)
            return;
        this.listeners.splice(index, 1);
    }
}
