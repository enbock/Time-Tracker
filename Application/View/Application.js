

import Style from "../../Theme/Style.js";
import Page from "./Page.js";
import SideMenu from "./SideMenu.js";
import TopBar from "./TopBar.js";
export default class Application {
    constructor(containerNode, adapter) {
        this.containerNode = containerNode;
        this.adapter = adapter;
    }
    render(model) {
        const adapter = this.adapter;
        ReactDOM.render(React.createElement("div", { className: "mdc-typography" },
            React.createElement(Style, { source: "material-components-web.min" }),
            React.createElement(Style, { source: "material-components-web.icons" }),
            React.createElement(Style, { source: model.theme.source, external: model.theme.external }),
            React.createElement(Style, { source: "Theme/ThemePatch" }),
            React.createElement(Style, { source: "Application" }),
            React.createElement(TopBar, { model: model.topAppBar, adapter: adapter }),
            React.createElement(SideMenu, { model: model.sideMenu, adapter: adapter }),
            React.createElement(Page, { model: model.page })), this.containerNode);
    }
}
