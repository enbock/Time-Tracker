
import Container from "./Container.js";
import ApplicationView from "./View/Application.js";
export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedLanguage: ''
        };
        Container.language.setupAdapter.addListener(this.onLanguageLoaded.bind(this));
        this.adapter = Container.applicationAction.adapter;
    }
    componentDidMount() {
        Container.language.changeLanguageSetup.interact({ languageCode: 'de-de' }, {}).then();
    }
    onLanguageLoaded(oldValue, newValue) {
        this.setState({ loadedLanguage: newValue.languageCode });
    }
    render() {
        const model = Container.applicationPresenter.present('Application');
        return React.createElement(ApplicationView, { model: model, adapter: this.adapter });
    }
}
