


export default class SideMenu extends React.Component {
    componentDidMount() {
        // @ts-ignore
        this.drawer = new mdc.drawer.MDCDrawer(ReactDOM.findDOMNode(this));
        this.drawer.listen('MDCDrawer:closed', this.props.adapter.onClose);
    }
    onMenuClick(event, name) {
        event.stopPropagation();
        event.preventDefault();
        this.props.adapter.onMenu(name);
    }
    render() {
        const model = this.props.model;
        this.drawer && (this.drawer.open = model.isOpen);
        const translation = model.translation;
        const isActive = model.isActive;
        const url = model.url;
        const menuEntries = model.pageNames.map((name, index) => {
            return React.createElement("a", { key: 'menuEntry:' + name, className: 'mdc-list-item' + (isActive[name] ? ' mdc-list-item--activated' : ''), href: url[name], "aria-selected": isActive[name] ? 'true' : 'false', "data-testid": name, tabIndex: index, onClick: (event) => this.onMenuClick(event, name) },
                React.createElement("i", { className: "material-icons mdc-list-item__graphic", "aria-hidden": "true" }, name),
                React.createElement("span", { className: "mdc-list-item__text" }, translation[name]));
        });
        return React.createElement(React.Fragment, null,
            React.createElement("aside", { className: "mdc-drawer mdc-drawer--modal mdc-top-app-bar--fixed-adjust" },
                React.createElement("div", { className: "mdc-drawer__content" },
                    React.createElement("nav", { className: "mdc-list" }, menuEntries))),
            React.createElement("div", { className: "mdc-drawer-scrim" }));
    }
}
