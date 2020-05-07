
import Container from "./Container.js";
import ApplicationView from "./View/Application.js";
export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedLanguage: Container.language.observer.value,
            menuOpen: Container.menuOpenState.value,
            loadedPage: null,
            shownPage: ''
        };
        this.adapter = Container.applicationActionAdapter;
        this.moduleLoader = Container.moduleLoader;
        Container.language.adapter.addListener(this.onLanguageLoaded.bind(this));
        Container.moduleStateAdapter.addListener(this.onModuleLoaded.bind(this));
        Container.menuOpenStateAdapter.onChange = this.onMenuChange.bind(this);
    }
    componentDidMount() {
    }
    onLanguageLoaded(newValue) {
        this.setState({ loadedLanguage: newValue });
    }
    onMenuChange(newValue) {
        this.setState({ menuOpen: newValue });
    }
    onModuleLoaded(newValue) {
        this.setState({ loadedPage: newValue });
    }
    render() {
        const model = Container.applicationPresenter.present();
        return React.createElement(ApplicationView, { model: model, adapter: this.adapter });
    }
}
