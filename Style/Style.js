
export default class Style extends React.Component {
    render() {
        return React.createElement("link", { rel: "stylesheet", href: './Style/' + this.props.source + '.css' });
    }
}
