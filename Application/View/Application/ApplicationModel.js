import TopAppBarModel from "../TopAppBar/TopAppBarModel.js";
export default class ApplicationModel {
    constructor() {
        this.topAppBar = new TopAppBarModel();
        this.text = '';
    }
}
