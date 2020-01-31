import LanguageContainer from "../Language/Container.js";
import ModelFactory from "./Model/Factory/Factory.js";
import ApplicationPresenter from "./Presenter/ApplicationPresenter.js";
class Container {
    constructor() {
        this.language = LanguageContainer;
        this.modelFactory = new ModelFactory();
        this.applicationPresenter = new ApplicationPresenter(this.modelFactory, this.language.setupObserver);
    }
}
export default new Container();
