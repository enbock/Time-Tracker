
export default class Style extends React.Component {
    render() {
        const source = this.props.external ? this.props.source : './Style/' + this.props.source + '.css';
        return React.createElement("link", { rel: "stylesheet", href: source });
    }
}
