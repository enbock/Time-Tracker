export default class ApplicationPresenter {
    constructor(modelFactory, languageSetupObserver) {
        this.modelFactory = modelFactory;
        this.languageSetupObserver = languageSetupObserver;
    }
    present(data) {
        const viewModel = this.modelFactory.createApplicationModel();
        const translator = this.languageSetupObserver.value.translator;
        viewModel.text = data + translator.translate('Application.Test');
        return viewModel;
    }
}
