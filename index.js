

import Application from "./Application.js";
import Style from "./Style/Style.js";
ReactDOM.render(React.createElement(React.Fragment, null,
    React.createElement(Style, { source: "material-components-web.min" }),
    React.createElement(Style, { source: "material-components-web.icons" }),
    React.createElement(Application, null)), document.getElementById('root'));
