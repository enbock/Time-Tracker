
import Style from "../../Style/Style.js";
import TopBar from "./TopBar.js";
export default class Application extends React.Component {
    render() {
        const { model, adapter } = this.props;
        return (React.createElement("div", { className: "mdc-typography" },
            React.createElement(Style, { source: "Application" }),
            React.createElement("div", { className: "content" },
                React.createElement(TopBar, { model: model.topAppBar, adapter: adapter }),
                React.createElement("h3", null,
                    "A new decade ... a new start ... \uD83D\uDE09",
                    React.createElement("br", null),
                    React.createElement("br", null),
                    "Hello from ",
                    model.text,
                    "!"))));
    }
}
