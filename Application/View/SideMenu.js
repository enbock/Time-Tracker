


export default class SideMenu extends React.Component {
    componentDidMount() {
        // @ts-ignore
        this.drawer = new mdc.drawer.MDCDrawer(ReactDOM.findDOMNode(this));
    }
    render() {
        this.drawer && (this.drawer.open = this.props.model.isOpen);
        return React.createElement("aside", { className: "mdc-drawer mdc-drawer--dismissible mdc-top-app-bar--fixed-adjust" },
            React.createElement("div", { className: "mdc-drawer__content" },
                React.createElement("nav", { className: "mdc-list" },
                    React.createElement("a", { className: "mdc-list-item mdc-list-item--activated", href: "#", "aria-current": "page" },
                        React.createElement("i", { className: "material-icons mdc-list-item__graphic", "aria-hidden": "true" }, "inbox"),
                        React.createElement("span", { className: "mdc-list-item__text" }, "Inbox")),
                    React.createElement("a", { className: "mdc-list-item", href: "#" },
                        React.createElement("i", { className: "material-icons mdc-list-item__graphic", "aria-hidden": "true" }, "send"),
                        React.createElement("span", { className: "mdc-list-item__text" }, "Outgoing")),
                    React.createElement("a", { className: "mdc-list-item", href: "#" },
                        React.createElement("i", { className: "material-icons mdc-list-item__graphic", "aria-hidden": "true" }, "drafts"),
                        React.createElement("span", { className: "mdc-list-item__text" }, "Drafts")))));
    }
}
