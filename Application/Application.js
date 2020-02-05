
import Container from "./Container.js";
import ApplicationView from "./View/Application.js";
export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedLanguage: Container.language.setupObserver.value.languageCode,
            menuOpen: Container.menuOpenState.value
        };
        Container.language.setupAdapter.addListener(this.onLanguageLoaded.bind(this));
        Container.menuOpenStateAdapter.onChange = this.onMenuOpenStateChange.bind(this);
        this.adapter = Container.applicationAction.adapter;
    }
    componentDidMount() {
        Container.language.changeLanguageSetup.interact({ languageCode: 'de-de' }, {}).then();
    }
    onLanguageLoaded(oldValue, newValue) {
        this.setState({ loadedLanguage: newValue.languageCode });
    }
    onMenuOpenStateChange(oldValue, newValue) {
        this.setState({ menuOpen: newValue });
    }
    render() {
        const model = Container.applicationPresenter.present('Application');
        return React.createElement(ApplicationView, { model: model, adapter: this.adapter });
    }
}
