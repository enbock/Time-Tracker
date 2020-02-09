export default class Model {
    constructor() {
        this.isOpen = false;
        this.isActive = {
            home: false,
            settings: false
        };
        this.url = {
            home: '',
            settings: ''
        };
        this.translation = {
            home: '',
            settings: ''
        };
        this.pageNames = [];
    }
}
