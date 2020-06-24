import ApplicationView from "./View/Application.js";
export default class Application {
    constructor(adapter, presenter) {
        this.presenter = presenter;
        this.adapter = adapter;
        this.renderCallback = this.run.bind(this);
    }
    attachToLanguage(adapter) {
        adapter.addListener(this.renderCallback);
    }
    attachToModuleState(adapter) {
        adapter.addListener(this.renderCallback);
    }
    attachToMenuOpenState(adapter) {
        adapter.onChange = this.renderCallback;
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
