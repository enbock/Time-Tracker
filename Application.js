
import Container from "./Application/Container.js";
import ApplicationView from "./Application/View/Application.js";
export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedLanguage: Container.language.setupObserver.value.languageCode,
            menuOpen: Container.menuOpenState.value,
            loadedPage: null
        };
        Container.language.setupAdapter.addListener(this.onLanguageLoaded.bind(this));
        Container.moduleStateAdapter.addListener(this.onModuleLoaded.bind(this));
        Container.menuOpenStateAdapter.onChange = this.onMenuChange.bind(this);
        this.adapter = Container.applicationAction.adapter;
    }
    componentDidMount() {
        Container.language.changeLanguageSetup.interact({ languageCode: 'de-de' }, {}).then();
        Container.moduleNameState.value = 'HelloWorld';
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
