import LanguageContainer from "../Language/Container.js";
import ApplicationPresenter from "./View/Application/ApplicationPresenter.js";
import ModelFactory from "./View/ModelFactory.js";
class Container {
    constructor() {
        this.language = LanguageContainer;
        this.modelFactory = new ModelFactory();
        this.applicationPresenter = new ApplicationPresenter(this.modelFactory, this.language.setupObserver);
    }
}
export default new Container();
