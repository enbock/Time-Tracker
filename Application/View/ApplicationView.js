
export default class ApplicationView extends React.Component {
    render() {
        const { model } = this.props;
        return (React.createElement("h1", null,
            "A new decade ... a new start ... \uD83D\uDE09",
            React.createElement("br", null),
            React.createElement("br", null),
            "Hello from ",
            model.text,
            "!"));
    }
}
