
export default class Application extends React.Component {
    render() {
        const { view } = this.props;
        return (React.createElement("h1", null,
            "A new decade ... a new start ... \uD83D\uDE09",
            React.createElement("br", null),
            React.createElement("br", null),
            "Hello from ",
            view.compiler,
            " and ",
            view.framework,
            "!"));
    }
}
