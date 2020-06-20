

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
            model.styleSet.map((path) => React.createElement("link", { key: 'stylePath_' + path, rel: "stylesheet", href: path })),
            React.createElement(TopBar, { model: model.topAppBar, adapter: adapter }),
            React.createElement(SideMenu, { model: model.sideMenu, adapter: adapter }),
            React.createElement(Page, { model: model.page })), this.containerNode);
    }
}
