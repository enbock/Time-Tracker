
import Style from "../../Style/Style.js";
import TopAppBar from "./TopAppBar.js";
export default class Application extends React.Component {
    render() {
        const { model } = this.props;
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: "mdc-typography" },
                React.createElement(Style, { source: "Application" }),
                React.createElement("div", { className: "content" },
                    React.createElement(TopAppBar, { model: model.topAppBar }),
                    React.createElement("h3", null,
                        "A new decade ... a new start ... \uD83D\uDE09",
                        React.createElement("br", null),
                        React.createElement("br", null),
                        "Hello from ",
                        model.text,
                        "!"))));
    }
}
