import ModelFactory from "./Model/ModelFactory.js";
import ApplicationPresenter from "./Presenter/ApplicationPresenter.js";
class Container {
    constructor() {
        this.modelFactory = new ModelFactory();
        this.applicationPresenter = new ApplicationPresenter(this.modelFactory);
    }
}
export default new Container();
