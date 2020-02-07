
export default class HelloWorld extends React.Component {
    render() {
        return React.createElement("h3", null,
            "A new decade ... a new start ... \uD83D\uDE09",
            React.createElement("br", null),
            React.createElement("br", null),
            "Hello from ",
            React.createElement("code", null, "HelloWorld.tsx"),
            "!");
    }
}
