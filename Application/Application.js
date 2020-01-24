
import Container from "./Container.js";
import ApplicationView from "./View/ApplicationView.js";
export default class Application extends React.Component {
    render() {
        const model = Container.ModelFactory.createApplicationModel();
        model.text = 'Application, which wait for a presenter';
        return React.createElement(ApplicationView, { model: model });
    }
}
