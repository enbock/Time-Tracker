import LanguageContainer from "../Language/Container.js";
import ApplicationAction from "./ApplicationAction.js";
import ApplicationPresenter from "./View/Application/Presenter.js";
import TopBarPresenter from "./View/TopBar/Presenter.js";
class Container {
    constructor() {
        this.language = LanguageContainer;
        this.topAppBarPresenter = new TopBarPresenter(this.language.setupObserver);
        this.applicationPresenter = new ApplicationPresenter(this.language.setupObserver, this.topAppBarPresenter);
        this.applicationAction = new ApplicationAction();
    }
}
export default new Container();
