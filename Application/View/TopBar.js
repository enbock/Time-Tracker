


export default class TopBar extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const topAppBarElement = ReactDOM.findDOMNode(this);
        // @ts-ignore
        this.topAppBar = new mdc.topAppBar.MDCTopAppBar(topAppBarElement);
    }
    render() {
        const model = this.props.model;
        return React.createElement(React.Fragment, null,
            React.createElement("header", { className: "mdc-top-app-bar mdc-top-app-bar--fixed" },
                React.createElement("div", { className: "mdc-top-app-bar__row" },
                    React.createElement("section", { className: "mdc-top-app-bar__section mdc-top-app-bar__section--align-start" },
                        React.createElement("button", { className: "material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" }, "menu"),
                        React.createElement("span", { className: "mdc-top-app-bar__title" }, model.title)))),
            React.createElement("div", { className: "mdc-top-app-bar__row" }));
    }
}
