import ApplicationView from "./View/Application.js";
export default class Application {
    constructor(adapter, presenter) {
        this.presenter = presenter;
        this.adapter = adapter;
        this.runCallback = this.run.bind(this);
    }
    attachToLanguage(adapter) {
        adapter.addListener(this.runCallback);
    }
    attachToModuleState(adapter) {
        adapter.addListener(this.runCallback);
    }
    attachToMenuOpenState(adapter) {
        adapter.onChange = this.runCallback;
    }
    attachToContainerNode(containerNode) {
        if (containerNode == null)
            return;
        this.view = new ApplicationView(containerNode, this.adapter);
    }
    run() {
        if (this.view == undefined)
            return;
        const model = this.presenter.present();
        this.view.render(model);
    }
}
