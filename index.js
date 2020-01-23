

import Application from "./Application/View/Application.js";
import ApplicationView from "./Application/View/Model/ApplicationView.js";
const view = new ApplicationView();
view.compiler = 'TypeScript';
view.framework = 'React and Uncle Bob';
ReactDOM.render(React.createElement(Application, { view: view }), document.getElementById('root'));
