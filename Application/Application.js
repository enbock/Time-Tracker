
import Container from "./Container.js";
import ApplicationView from "./View/Application.js";
export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedLanguage: Container.language.observer.value.languageCode,
            menuOpen: Container.menuOpenState.value,
            loadedPage: null,
            shownPage: ''
        };
        this.adapter = Container.applicationAction.adapter;
        this.moduleLoader = Container.moduleLoader;
        Container.language.adapter.addListener(this.onLanguageLoaded.bind(this));
        Container.moduleStateAdapter.addListener(this.onModuleLoaded.bind(this));
        Container.router.adapter.addListener(this.adapter.onPageChanged);
        Container.menuOpenStateAdapter.onChange = this.onMenuChange.bind(this);
    }
    componentDidMount() {
        Container.language.changeLanguageSetup.interact({ languageCode: 'de-de' }, {}).then();
        const homePage = {
            depth: 0,
            name: 'home',
            url: './',
            module: './HelloWorld'
        };
        const settingsPage = {
            depth: 1,
            name: 'settings',
            url: './settings/',
            module: './Settings/Settings'
        };
        Container.router.registry.registerPage(homePage);
        Container.router.registry.registerPage(settingsPage);
        Container.router.observer.value = homePage;
    }
    onLanguageLoaded(oldValue, newValue) {
        this.setState({ loadedLanguage: newValue.languageCode });
    }
    onMenuChange(oldValue, newValue) {
        this.setState({ menuOpen: newValue });
    }
    onModuleLoaded(oldValue, newValue) {
        this.setState({ loadedPage: newValue });
    }
    render() {
        const model = Container.applicationPresenter.present();
        return React.createElement(ApplicationView, { model: model, adapter: this.adapter });
    }
}
