
import Container from "./Container.js";
import ApplicationView from "./View/ApplicationView.js";
export default class Application extends React.Component {
    render() {
        const model = Container.applicationPresenter.present('Application');
        return React.createElement(ApplicationView, { model: model });
    }
}
