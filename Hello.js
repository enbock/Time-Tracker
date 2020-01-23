
export default class Hello extends React.Component {
    render() {
        return (React.createElement("h1", null,
            "A new decade ... a new start ... \uD83D\uDE09",
            React.createElement("br", null),
            React.createElement("br", null),
            "Hello from ",
            this.props.compiler,
            " and ",
            this.props.framework,
            "!"));
    }
}
