export default class MenuOpenStateAdapter {
    constructor() {
        this.currentState = false;
    }
    onChange(newValue) {
        this.currentState = newValue;
    }
}
