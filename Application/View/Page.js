
export default class Page extends React.Component {
    render() {
        return React.createElement("div", { className: "mdc-drawer-app-content mdc-top-app-bar--fixed-adjust" },
            React.createElement("main", { className: "main-content", id: "main-content" }, this.props.model.module != null ? React.createElement(this.props.model.module, null) : React.createElement("div", null, "Loading...")));
    }
}
