export default class ListenerAdapter {
    constructor(asyncCallbacks = true) {
        this.asyncCallbacks = true;
        this.asyncCallbacks = asyncCallbacks;
        this.listeners = [];
    }
    onChange(newValue) {
        const runAsync = this.asyncCallbacks;
        function callListener(listener) {
            if (runAsync) {
                setTimeout(function handler() {
                    listener(newValue);
                }, 1);
            }
            else {
                listener(newValue);
            }
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
