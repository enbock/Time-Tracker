
import Style from "../../Style/Style.js";
import Page from "./Page.js";
import SideMenu from "./SideMenu.js";
import TopBar from "./TopBar.js";
export default class Application extends React.Component {
    render() {
        const { model, adapter } = this.props;
        return React.createElement("div", { className: "mdc-typography" },
            React.createElement(Style, { source: "material-components-web.min" }),
            React.createElement(Style, { source: "material-components-web.icons" }),
            React.createElement(Style, { source: "Application" }),
            React.createElement(TopBar, { model: model.topAppBar, adapter: adapter }),
            React.createElement(SideMenu, { model: model.sideMenu, adapter: adapter }),
            React.createElement(Page, { model: model.page }));
    }
}
