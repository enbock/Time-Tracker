export default class ApplicationPresenter {
    constructor(modelFactory) {
        this.modelFactory = modelFactory;
    }
    present(data) {
        const viewModel = this.modelFactory.createApplicationModel();
        viewModel.text = data + ', which has a presenter and need language manager';
        return viewModel;
    }
}
